# Panduan Menambah Episode — The Quran Lens

Dokumen ini adalah **"pipa konten"**: alur baku agar menambah satu episode jadi
cepat, konsisten, dan tahan-typo. Semua konten ada di `assets/js/content.js`.

> 🔑 **Aturan emas:** setelah menambah episode, **selalu** jalankan
> `node tools/validasi-konten.js`. Kalau hijau ✅, aman. Kalau merah ❌,
> perbaiki dulu sebelum commit — itu mencegah app blank di produksi.

---

## Alur produksi satu episode

```
1. Pilih ayat (lihat KONTEN-ROADMAP.md)
2. Riset    → tafsir mu'tabar + akar kata + balaghah ("kenapa kata ini?")
3. Tulis    → isi template di bawah
4. Tempel   → di 5 tempat pada content.js (lihat checklist)
5. Validasi → node tools/validasi-konten.js  (harus ✅)
6. Review   → ⭐ idealnya dicek ustadz/ahli sebelum tayang (lihat catatan)
7. Tayang   → commit & deploy
```

---

## Checklist 5 tempat (PALING SERING LUPA)

Menambah 1 episode = menyentuh **5 bagian** di `content.js`. Lewatkan satu →
episode tak muncul atau salah tampil. Validator akan menangkap sebagian besarnya.

- [ ] **`AYAT`** — tambah objek episode (template di bawah), urut sesuai mushaf.
- [ ] **`MUSIM`** — daftarkan `id` episode ke `episodes` musim yang tepat.
      *(Wajib! Tanpa ini episode tak muncul di navigasi — validator akan protes.)*
- [ ] **`FOKUS`** — kata Arab yang "menyala" di Ayah Display untuk episode ini.
- [ ] **`HIKMAH_KATA`** — satu kalimat hikmah untuk **tiap** kata di `kajianKata`
      (jumlah harus sama persis dengan jumlah `kajianKata`).
- [ ] *(opsional)* **`ALT`** — hanya untuk pola lama berbasis `visual`. Pendekatan
      baru cukup pakai `alt: true` langsung di dalam kartu `banding`.

---

## Template episode kosong (salin–tempel ke array `AYAT`)

```js
{
  id: 'NAMA-SURAH-NO',                 // unik & huruf kecil, mis. 'an-naba-1'
  kajianKata: [
    {
      kata: 'الكَلِمَة', latin: 'Al-kalimah', arti: 'arti kata',
      poin: [
        'Poin balaghah/akar kata 1.',
        'Poin 2.',
      ],
      // OPSIONAL — perbandingan "Dipilih vs Alternatif" (pembeda utama app):
      banding: { tipe: 'banding', item: [
        { arab: 'الكَلِمَة', latin: 'Al-kalimah', sifat: ['nuansa 1', 'nuansa 2'] },
        { arab: 'البَدِيل',  latin: 'Al-badīl', alt: true, sifat: ['kekurangan 1', 'kekurangan 2'] },
      ], catatan: 'Kenapa kata ini dipilih, bukan alternatifnya.' },
      // OPSIONAL akar kata: akar: { tipe: 'akar', huruf: ['ر','ح','م'], teks: '...' },
      sumber: ['Tafsir Ibnu Katsir'],
    },
    // ...kata berikutnya
  ],
  hikmahPoin: [                        // hikmah ringkas tingkat-ayat (gratis)
    'Pelajaran 1.',
    'Pelajaran 2.',
  ],
  surah: 'Nama-Surah', surahNo: 0, ayatNo: '0', juz: 0,
  tema: ['tema1', 'tema2'],
  // gratis: true,                     // buka semua lapisan tanpa Premium (etalase)
  arab: 'النص العربي الكامل',
  latin: 'Transliterasi lengkap.',
  arti: 'Terjemahan lengkap.',
  asbabunNuzul: 'Sebab turunnya — atau "Tidak ada riwayat khusus" bila memang tak ada.',
  tafsir: 'Penjelasan makna ringkas.',
  hikmah: 'Ibrah inti satu paragraf.',
  amalan: 'Contoh penerapan dalam keseharian.',
  sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],  // WAJIB ≥1
},
```

### Field WAJIB (validator menolak bila kosong)
`id`, `arab`, `latin`, `arti`, `surah`, `surahNo`, `ayatNo`, dan `sumber` (≥1).

### Field sangat dianjurkan (validator memperingatkan)
`tafsir`, `asbabunNuzul`, `amalan`, dan salah satu dari `hikmah`/`hikmahPoin`.

---

## Daftarkan ke MUSIM

Di `const MUSIM`, tambahkan `id` ke musim yang sesuai:

```js
{ id: 'musim-1', label: 'Musim 1', surah: 'Al-Baqarah', ket: 'Sedang berjalan',
  episodes: ['al-baqarah-1', /* ... */, 'al-baqarah-BARU'] },
```

Membuat musim baru? Tambah objek `{ id, label, surah, ket, episodes: [...] }`.

---

## ⭐ Catatan review keilmuan (penting)

Klaim balaghah ("dipakai X bukan Y") adalah inti nilai jual — sekaligus risiko
reputasi terbesar bila keliru. **Sebelum tayang luas, idealnya tiap episode
dicek oleh ustadz/ahli.** Selama tahap ini ditunda, beri tanda jujur pada konten
yang belum tervalidasi dan utamakan rujukan tafsir mu'tabar yang tercantum di
`sumber`.

---

## Perintah cepat

```bash
node --check assets/js/content.js     # cek sintaks JS
node tools/validasi-konten.js         # cek kelengkapan & konsistensi konten
```
