const fs = require('fs');

function loadMembers(filepath) {
    if (!fs.existsSync(filepath)) return new Set();
    const data = fs.readFileSync(filepath, 'utf-8');
    const lines = data.split('\n');
    const ignore = new Set(['group admin', 'admin grup', 'search members', 'search contacts', 'add member', 'invite to group via link']);
    
    const members = new Set();
    for (const line of lines) {
        const cleaned = line.trim().toLowerCase();
        if (cleaned && !ignore.has(cleaned)) {
            members.add(cleaned);
        }
    }
    return members;
}

const announcement = loadMembers('announcement_member_list.txt');
const ruangCurhat = loadMembers('ruang curhat_member_list.txt');
const jobseeker = loadMembers('jobseeker_member_list.txt');
const upskill = loadMembers('upskill_member_list.txt');

console.log(`Total Member 'Announcement': ${announcement.size}`);
console.log(`Total Member 'Ruang Curhat': ${ruangCurhat.size}`);
console.log(`Total Member 'Jobseeker': ${jobseeker.size}`);
console.log(`Total Member 'Upskill': ${upskill.size}`);

function getIntersectionSize(setA, setB) {
    let count = 0;
    for (let elem of setA) {
        if (setB.has(elem)) {
            count++;
        }
    }
    return count;
}

function calculateOverlap(source, base) {
    const overlapSize = getIntersectionSize(source, base);
    return source.size > 0 ? (overlapSize / source.size) * 100 : 0;
}

console.log("\n--- HASIL ANALISA KESAMAAN DENGAN ANNOUNCEMENT (BASE) ---");
const jobInAnnounce = getIntersectionSize(jobseeker, announcement);
const upInAnnounce = getIntersectionSize(upskill, announcement);
const ruangInAnnounce = getIntersectionSize(ruangCurhat, announcement);

console.log(`Jobseeker    -> Announcement: ${jobInAnnounce} dari ${jobseeker.size} orang (${calculateOverlap(jobseeker, announcement).toFixed(1)}%)`);
console.log(`Upskill      -> Announcement: ${upInAnnounce} dari ${upskill.size} orang (${calculateOverlap(upskill, announcement).toFixed(1)}%)`);
console.log(`Ruang Curhat -> Announcement: ${ruangInAnnounce} dari ${ruangCurhat.size} orang (${calculateOverlap(ruangCurhat, announcement).toFixed(1)}%)`);

console.log("\n--- INFO TAMBAHAN (ANTAR GRUP) ---");
console.log(`Jobseeker -> Ruang Curhat: ${getIntersectionSize(jobseeker, ruangCurhat)} dari ${jobseeker.size} orang (${calculateOverlap(jobseeker, ruangCurhat).toFixed(1)}%)`);
console.log(`Upskill   -> Ruang Curhat: ${getIntersectionSize(upskill, ruangCurhat)} dari ${upskill.size} orang (${calculateOverlap(upskill, ruangCurhat).toFixed(1)}%)`);
