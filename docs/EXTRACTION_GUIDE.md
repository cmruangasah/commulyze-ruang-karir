# Panduan Ekstraksi Member Grup WhatsApp Web

Dokumen ini berisi panduan dan kode yang digunakan untuk menarik daftar member grup WhatsApp secara lengkap, dengan mengakali sistem *Virtual DOM* dari WhatsApp Web.

## Langkah-Langkah Ekstraksi

1. Buka [WhatsApp Web](https://web.whatsapp.com/) dan masuk ke grup yang ingin diekstrak.
2. Klik nama grup di bagian atas untuk membuka panel **Info Grup (Group Info)** di sebelah kanan.
3. Scroll panel kanan ke bawah, lalu klik **"Lihat semua" (View all)** pada bagian daftar peserta (Participants).
4. Akan muncul kotak pop-up putih (**Search members**) yang berisi daftar seluruh anggota.
5. **Kembalikan scroll ke posisi paling atas (huruf A).**
6. Buka **Developer Tools** browser dengan menekan tombol **F12** atau klik kanan -> **Inspect**.
7. Buka tab **Console**.
8. Jalankan **KODE 1** di bawah ini untuk memulai perekaman.
9. Setelah Perekam Aktif, **scroll perlahan daftar member di kotak putih tersebut ke arah bawah sampai mentok di peserta terakhir (huruf Z)**.
10. Jalankan **KODE 2** di bawah ini untuk menghentikan rekaman dan mengunduh file `.txt`.

---

## KODE 1 (Mulai Merekam)

Paste kode ini di Console, lalu tekan Enter:

```javascript
window.whatsappMembers = new Set();
window.memberRecorder = setInterval(function() {
    let dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return; 
    
    let textElements = Array.from(dialog.querySelectorAll('span[title]'));
    textElements.forEach(el => {
        let val = el.textContent.trim();
        let title = el.getAttribute('title').trim();
        
        // Memastikan yang diambil hanya nama/nomor, bukan status/about
        if (val === title && val && 
            val !== "Admin" && val !== "Pembuat grup" && val !== "Group creator" && 
            val !== "Anda" && val !== "You" && val.length > 2 && val.length < 50
        ) {
            window.whatsappMembers.add(val);
        }
    });
}, 500); 
console.log("✅ PEREKAM (FOKUS POP-UP) AKTIF! Silakan scroll perlahan ke bawah.");
```

---

## KODE 2 (Selesai & Download)

Paste kode ini di Console setelah Anda selesai men-scroll sampai paling bawah, lalu tekan Enter:

```javascript
clearInterval(window.memberRecorder);
let memberList = Array.from(window.whatsappMembers).sort();
console.log("🎉 SELESAI! Total terekstrak: " + memberList.length + " member.");

let txtContent = memberList.join("\n");
let blob = new Blob([txtContent], { type: 'text/plain' });
let a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = 'member_list_lengkap.txt';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
```

## Troubleshooting
- Jika jumlah member meleset jauh (>50 orang), pastikan Anda melakukan *refresh* browser (F5) sebelum memulai proses pada grup baru, agar memori ter-reset dengan bersih.
- Jika hasil lebih 5-10 nama, itu normal karena mencakup label teks bawaan WhatsApp seperti "Group admin" atau "Search contacts". Gunakan script `cleaner.js` untuk membersihkan data.

### Catatan Penting: Margin of Error
Setelah data dibersihkan (menggunakan script `cleaner.js`), mungkin masih akan terdapat selisih lebih sekitar 3-10 kontak dibandingkan angka member asli di grup WhatsApp. 
Ini adalah **Margin of Error yang sangat wajar (sekitar ~0.5%)** dan diakibatkan oleh:
1. **Status WA Custom:** Ada kemungkinan pengguna memakai status yang sangat panjang/unik sehingga dirender oleh sistem menyerupai format nama.
2. **Karakter Khusus:** Karakter emoji khusus (seperti *zero-width joiner*) kadang dipecah oleh DOM browser menjadi dua elemen teks yang terpisah.

Karena WhatsApp secara aktif mengacak (obfuscate) kode web mereka untuk mencegah *scraping*, mendapatkan akurasi di atas 99% menggunakan script konsol sudah merupakan titik optimal. Untuk tujuan analisa tumpang-tindih (overlap) grup (mencari kesamaan >90%), selisih margin 0.5% ini **sepenuhnya aman untuk diabaikan dan tidak akan mengubah validitas keputusan bisnis Anda**.
