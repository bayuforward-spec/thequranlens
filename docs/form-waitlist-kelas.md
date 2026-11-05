# Spesifikasi Google Form — Waitlist Kelas Tadabbur Batch 1

**Status:** siap dibangun · **Belum dipublikasikan** · Butuh akun Google Bayu  
**Tujuan:** data masuk Sheets; tombol di `kelas.html` membuka form ini.  
**Jangan** invent URL palsu di kode. Ganti `FORM_URL_TODO` / `data-form-url` di `kelas.html` setelah form live.

## Akun yang disarankan
- **Utama:** Google yang memegang brand Quran Lens / situs (usul: `anaknyazan03@gmail.com` atau akun yang sudah dipakai Mayar/GA4 — **Bayu memutuskan**).
- Alternatif kontak privasi yang sudah tertulis di situs: `bayuforward@gmail.com` (hanya untuk hapus data / berhenti kabar, bukan wajib pemilik form).

## Judul & deskripsi form
- **Judul:** Daftar waitlist Batch 1 — Kelas Tadabbur · The Quran Lens
- **Deskripsi:**
  > Waitlist gratis, tanpa kewajiban, tanpa pembayaran. Kami hanya mengabari saat Batch 1 (Juz 30 kata demi kata, rekaman self-paced) siap diumumkan. Data dipakai sesuai Kebijakan Privasi thequranlensindonesia.com/privacy.html.

## Pengaturan form
- Collect email addresses: **Off** (email sudah jadi pertanyaan wajib sendiri, agar konsisten dengan copy).
- Limit to 1 response: Off (atau On bila Bayu mau — default Off).
- Show progress bar: Off.
- Confirmation message **atau** redirect:
  - **Disarankan:** Settings → Presentation → **Redirect to**  
    `https://thequranlensindonesia.com/kelas.html?waitlist=ok`  
    (supaya GA4 `waitlist_submit` method=`form_confirm` terkirim).
  - Alternatif pesan konfirmasi di Google Form:
    > Terima kasih, kamu sudah masuk waitlist Kelas Tadabbur Batch 1. Kami akan mengabarimu lewat email saat rincian kelas siap.
- Response destination: **Google Sheet** baru, nama usul: `QL Waitlist Kelas Tadabbur Batch 1`.
- Sharing Sheet: hanya akun yang perlu (Bayu + Tim Quran Lens). Jangan publik.

## Pertanyaan (urutan persis)

1. **Nama** — Short answer — **Required**  
   Placeholder/help: `Nama panggilan`

2. **Email** — Short answer — **Required** — Response validation: Text → Email  

3. **WhatsApp** — Short answer — **Optional**  
   Help: `08xx (opsional, hanya untuk kabar kelas)`  
   Validation opsional: regular expression nomor ID bila Bayu mau.

4. **Minat topik** — Checkboxes — **Required** (boleh lebih dari satu)  
   Opsi (Juz 30 ditonjolkan di urutan atas, tidak dipaksa tercentang):
   - ☐ Juz 30 (surah pendek) — Batch 1
   - ☐ Al-Fātiḥah kata demi kata
   - ☐ Ketenangan hati
   - ☐ Mengenal nama & sifat Allah
   - ☐ Rezeki, kerja & kejujuran
   - ☐ Bekal akhirat & muhasabah
   - ☐ Dasar Nahwu untuk tadabbur
   - ☐ Lainnya: ___ (enable "Other")

5. **Persetujuan data** — Multiple choice / Checkbox (satu opsi) — **Required**  
   ☐ Saya setuju data saya dipakai untuk mengirim kabar tentang Kelas Tadabbur, sesuai catatan privasi di thequranlensindonesia.com/privacy.html.

6. **Persetujuan WhatsApp** — Checkbox — **Optional**  
   ☐ Boleh hubungi saya lewat WhatsApp untuk kabar kelas.  
   Catatan: idealnya section/branching "tampil bila WhatsApp terisi"; Google Forms branching terbatas — boleh selalu tampil; Tim hanya menghubungi WA bila nomor diisi **dan** centang ini aktif.

## Setelah form dibuat (checklist Bayu)
1. Salin link publik form (`https://docs.google.com/forms/d/e/.../viewform`).
2. Beri Tim Quran Lens / CEO link itu untuk ditempel ke `kelas.html`:
   - atribut `data-form-url="…"`
   - pastikan bukan `FORM_URL_TODO`
3. Set redirect konfirmasi ke `kelas.html?waitlist=ok` (lihat atas).
4. Uji 1x submit sendiri; cek baris di Sheet + event GA4 DebugView `waitlist_submit`.
5. Baru izinkan merge/go-live halaman ke `main`.

## Yang sengaja tidak ada di form
Harga, pembayaran, kartu kredit, undian, data medis, tautan SpOG, hitung mundur, kuota palsu.
