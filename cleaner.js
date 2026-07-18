const fs = require('fs');

const statusesToRemove = new Set([
    "ada", 
    "available", 
    "can't talk, whatsapp only", 
    "sibuk", 
    "urgent calls only",
    "hai, saya menggunakan whatsapp business.", 
    "panggilan mendesak saja",
    "tidak bisa ditelepon, whatsapp saja", 
    "tidak dapat bicara, whatsapp saja",
    "busy", 
    "at work", 
    "di tempat kerja", 
    "sedang rapat", 
    "in a meeting",
    "baterai hampir habis", 
    "battery about to die", 
    "sedang tidur", 
    "sleeping",
    "hanya panggilan darurat", 
    "calls urgent only", 
    "work inquiries only, no calls.",
    "selalu ada penuhi kebutuhan anda!", 
    "always open, spam if urgent, beware clone",
    "slow respon", 
    "group admin", 
    "admin grup",
    "search members",
    "search contacts",
    "add member",
    "invite to group via link"
]);

function cleanFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    const data = fs.readFileSync(filepath, 'utf-8');
    const lines = data.split('\n');
    const cleanedLines = [];
    
    let removedCount = 0;
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        // Hapus jika itu adalah status WA umum (case insensitive)
        if (statusesToRemove.has(trimmed.toLowerCase())) {
            removedCount++;
            continue;
        }
        
        cleanedLines.push(trimmed);
    }
    
    // Sort ulang biar rapi
    cleanedLines.sort();
    
    fs.writeFileSync(filepath, cleanedLines.join('\n'));
    console.log(`✅ [${filepath}] Berhasil dibersihkan. Dihapus ${removedCount} baris status/UI nyasar. Sisa kontak: ${cleanedLines.length}`);
}

// Eksekusi untuk semua file teks di folder saat ini
const files = fs.readdirSync(__dirname);
for (const file of files) {
    if (file.endsWith('.txt')) {
        cleanFile(file);
    }
}
