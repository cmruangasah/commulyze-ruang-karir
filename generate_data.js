const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.txt'));

const data = {
    groups: [],
    members: {},
    totalUniqueMembers: 0,
    announcementMembers: 0
};

// Process each file
files.forEach(file => {
    const groupName = file.replace('_member_list.txt', '').replace(/(^\w|\s\w)/g, m => m.toUpperCase()); // Format name
    
    const content = fs.readFileSync(path.join(__dirname, file), 'utf-8');
    const members = content.split('\n').map(m => m.trim()).filter(m => m);
    
    data.groups.push({
        id: file,
        name: groupName,
        size: members.length
    });
    
    if (groupName.toLowerCase() === 'announcement') {
        data.announcementMembers = members.length;
    }
    
    members.forEach(member => {
        if (!data.members[member]) {
            data.members[member] = [];
        }
        data.members[member].push(groupName);
    });
});

data.totalUniqueMembers = Object.keys(data.members).length;

// Calculate overlap matrix
data.overlapMatrix = [];
data.groups.forEach(groupA => {
    const row = { group: groupA.name, overlaps: {} };
    data.groups.forEach(groupB => {
        // Count how many members of groupA are also in groupB
        let common = 0;
        Object.values(data.members).forEach(userGroups => {
            if (userGroups.includes(groupA.name) && userGroups.includes(groupB.name)) {
                common++;
            }
        });
        
        const percentage = groupA.size > 0 ? (common / groupA.size) * 100 : 0;
        row.overlaps[groupB.name] = {
            count: common,
            percentage: parseFloat(percentage.toFixed(1))
        };
    });
    data.overlapMatrix.push(row);
});

// Calculate engagement distribution (how many groups per user)
const engagementDist = {};
let totalActiveInSubgroups = 0;

Object.values(data.members).forEach(userGroups => {
    // filter out 'Announcement' to count only active sub-groups
    const subGroups = userGroups.filter(g => g.toLowerCase() !== 'announcement');
    const count = subGroups.length;
    
    if (count > 0) totalActiveInSubgroups++;
    
    if (!engagementDist[count]) engagementDist[count] = 0;
    engagementDist[count]++;
});

data.engagementDistribution = Object.entries(engagementDist)
    .map(([groupCount, userCount]) => ({
        groupCount: parseInt(groupCount),
        userCount,
        label: `${groupCount} Group${groupCount > 1 ? 's' : ''}`
    }))
    .sort((a, b) => b.groupCount - a.groupCount);

// Passive listeners (only in announcement)
data.passiveListeners = data.announcementMembers - totalActiveInSubgroups;
data.activeInSubgroups = totalActiveInSubgroups;

const outPath = path.join(__dirname, 'dashboard', 'src', 'data.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
console.log(`✅ Berhasil meng-generate ${outPath}`);
