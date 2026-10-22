# Analitik & atribusi — The Quran Lens

Situs live `https://thequranlensindonesia.com` adalah **file statis di repo ini**,
diterbitkan **GitHub Pages** dari branch `main` (bukan Netlify/Vercel, bukan
Render). Backend Render (`quran-lens-api`) hanya verifikasi Mayar & Tanya
ustadz — **jangan** menaruh Measurement ID di sana.

Google Analytics **tidak dimuat** sampai Measurement ID diisi lewat langkah
di bawah. Tidak ada ID yang ditulis di kode.

Yang dikirim hanya analitik kunjungan. Tidak ada iklan, remarketing, Google
Signals, atau personalisasi iklan.

---

## 1. Yang harus pemilik lakukan

1. Buat properti **GA4** (bukan Universal Analytics) di [analytics.google.com](https://analytics.google.com).
   Admin → **Data streams** → **Web** → URL `https://thequranlensindonesia.com` → salin **Measurement ID** (`G-XXXXXXXX`).
2. **Gabungkan PR ini** dulu. Situs tetap terbit dari branch; analitik masih mati (itu sengaja).
3. Di GitHub, buka repo **bayuforward-spec/thequranlens** → **Settings** → **Secrets and variables** → **Actions** → tab **Variables** → **New repository variable**.
   - Name: `GA_MEASUREMENT_ID`
   - Value: Measurement ID tadi, bentuknya `G-` diikuti huruf dan angka (punya Anda sendiri — jangan dipakai ID contoh)
   
   Ini padanan `NEXT_PUBLIC_GA_MEASUREMENT_ID` untuk situs statis ini. Jangan commit ID-nya.
4. Masih di Settings → **Pages** → **Build and deployment** → **Source**: ganti dari *Deploy from a branch* menjadi **GitHub Actions**.
5. Tab **Actions** → workflow **GitHub Pages** → **Run workflow** pada branch `main`. Tunggu hijau.
   Situs yang terbit isinya sama; yang berubah hanya ID analitik yang disuntikkan saat deploy.
   Jalankan workflow segera setelah mengganti sumber Pages.
6. Di produk Mayar **the-quran-lens** → **Track** → **URL Param**, daftarkan nama parameter ini lalu simpan:
   `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `plan`.
   Tanpa daftar itu, checkout tetap terbuka, tetapi Mayar tidak menyimpan asal trafik di transaksi.
7. Di GA4 → Admin → **Events**, tandai sebagai **key event**: `premium_checkout_click`, `lanjutkan_membaca`, `save_episode`, `episode_read`, `tanya_ustadz_used`. (`page_view` sudah otomatis.)

Mengosongkan variable lalu menjalankan workflow lagi mematikan GA tanpa mengubah halaman.

---

## 2. Peristiwa

`page_view` dikirim otomatis oleh gtag (sekali per muatan halaman: beranda, `gratis.html`, kebijakan privasi). Perpindahan tab di dalam aplikasi **tidak** membuat `page_view` baru — episode punya peristiwanya sendiri.

Setiap peristiwa di bawah ini ikut membawa atribusi (bagian 3) bila ada.

| Peristiwa | Kapan | Parameter khusus |
|---|---|---|
| `episode_read` | Episode benar-benar dibuka di tab Kajian, atau etalase `gratis.html` | `episode_id`, `surah`, `ayat`, `kata` (latin kata yang dikaji, bila ada), `gratis` (`1`/`0`) |
| `lanjutkan_membaca` | Klik tombol di kartu "Lanjutkan membaca" (membuka modal Premium) | field episode yang sama |
| `save_episode` | Episode ditandai tersimpan (🏷️). Melepas tanda tidak dihitung | field episode yang sama |
| `premium_view` | Harga terlihat: gulir ke harga di beranda, buka tab Langganan, atau buka modal | `surface` = `beranda` \| `langganan` \| `modal` (sekali per permukaan per muatan halaman) |
| `premium_checkout_click` | Klik paket yang membuka checkout Mayar | `plan` = `monthly` \| `yearly`, `provider` = `mayar` |
| `tanya_ustadz_used` | Pertanyaan dikirim ke Tanya ustadz AI | `pertemuan` (nomor bab, `0` = beranda kursus). Isi pertanyaan tidak dikirim |
| `outbound_youtube` | Klik tautan ke YouTube | `link_url` |
| `outbound_instagram` | Klik tautan ke Instagram | `link_url` |
| `outbound_tiktok` | Klik tautan ke TikTok | `link_url` |

Belum ada tautan YouTube/Instagram/TikTok di halaman. Pendengarnya sudah pasang: begitu tautan itu ada, kliknya terhitung tanpa ubah kode lagi.

**Waitlist.** Repo ini tidak punya formulir waitlist dan tidak menyimpan pendaftar di database. Peristiwa `waitlist_signup` sengaja tidak dipasang. Kalau nanti ada, kirim peristiwa itu saat simpan berhasil, dan simpan di record yang sama: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referrer`, `landing_page` (first-touch dan last-touch).

Pembelian Google Play (edisi aplikasi) tidak lewat Mayar, jadi tidak masuk `premium_checkout_click`.

---

## 3. Parameter atribusi

Disimpan di perangkat (localStorage `quranlens_attr`, atau cookie first-party bila localStorage ditolak) selama **90 hari** sejak first-touch. Kunjungan langsung setelahnya tidak menghapus kampanye terakhir.

| Di GA4 | Arti |
|---|---|
| `ft_source`, `ft_medium`, `ft_campaign`, `ft_content`, `ft_term` | UTM first-touch |
| `ft_referrer`, `ft_landing` | Perujuk & halaman masuk pertama |
| `lt_source`, `lt_medium`, `lt_campaign`, `lt_content`, `lt_term` | UTM last-touch (kampanye terbaru) |
| `lt_referrer`, `lt_landing` | Perujuk & halaman masuk last-touch |

Field kosong tidak dikirim.

---

## 4. Konvensi UTM

Pasang di **setiap** tautan kanal (deskripsi YouTube, bio, komentar tersemat, story, kartu).

| Parameter | Nilai |
|---|---|
| `utm_source` | `youtube` \| `instagram` \| `tiktok` \| `community` |
| `utm_medium` | `deskripsi` \| `bio` \| `komentar_tersemat` \| `story` \| `kartu` |
| `utm_campaign` | slug kampanye atau video, mis. `comeback_okt26` |
| `utm_content` | opsional, pembeda tautan di tempat yang sama |
| `utm_term` | opsional |

Huruf kecil, tanpa spasi. Contoh:

```
https://thequranlensindonesia.com/?utm_source=youtube&utm_medium=deskripsi&utm_campaign=comeback_okt26
https://thequranlensindonesia.com/gratis.html?utm_source=instagram&utm_medium=bio&utm_campaign=al-ikhlas
https://thequranlensindonesia.com/?utm_source=tiktok&utm_medium=komentar_tersemat&utm_campaign=nama-video
https://thequranlensindonesia.com/?utm_source=tiktok&utm_medium=story&utm_campaign=comeback_okt26
https://thequranlensindonesia.com/?utm_source=community&utm_medium=kartu&utm_campaign=comeback_okt26
```

Saat pengunjung menekan paket, parameter last-touch (plus `plan=monthly` atau `plan=yearly`) ditambahkan ke URL Mayar `https://bayu-maulana.myr.id/m/the-quran-lens`. Mayar tidak punya kolom referensi terpisah; URL Param di atas adalah caranya.

---

## 5. Melihat konversi per sumber di GA4

Butuh beberapa jam (kadang sampai esok) sebelum laporan standar terisi. DebugView langsung.

**Asal sesi** (UTM masih menempel di URL saat halaman dibuka):

1. Reports → **Acquisition** → **Traffic acquisition**.
2. Ubah dimensi utama menjadi **Session source / medium** atau **Session campaign**.
3. Tambah metrik key events, terutama `premium_checkout_click`.

**Konversi yang terjadi belakangan** (pengunjung kembali tanpa UTM, masih dalam 90 hari):

1. **Explore** → **Free form**.
2. Dimensions: `Event name`, `lt_source`, `lt_medium`, `lt_campaign`. Untuk first-touch pakai `ft_source`, `ft_medium`, `ft_campaign`.
3. Metrics: **Event count**.
4. Filter `Event name` = `premium_checkout_click` (atau `lanjutkan_membaca`, `save_episode`, …).
5. Baris: `lt_source`. Breakdown: `lt_campaign`.

`lt_*` adalah kampanye terakhir yang kami simpan. `ft_*` adalah yang pertama. Laporan akuisisi GA4 sendiri hanya melihat UTM di sesi itu, bukan kunjungan 90 hari lalu — makanya keduanya ada.

---

## 6. Memeriksa bahwa peristiwa benar-benar jalan

Tanpa ID (sekarang): buka

`https://thequranlensindonesia.com/?utm_source=youtube&utm_medium=deskripsi&utm_campaign=comeback_okt26&analytics_debug=1`

Konsol browser → saring `[analytics]`. Ada `ga_status` dengan `active: 0` dan **tidak** ada permintaan ke `googletagmanager.com`. Peristiwa (baca episode, simpan, klik paket, …) tetap tercatat di konsol dan `window.__analyticsLog`, tetapi tidak dikirim ke Google.

Setelah ID terpasang, URL yang sama menulis `active: 1`, memuat gtag, dan (karena `debug_mode`) peristiwa muncul di GA4 → Admin → **DebugView**.

Uji lokal tanpa browser:

```bash
node tools/uji-analytics.js
```

Uji di Chromium (butuh `playwright` atau `playwright-core` + Chrome):

```bash
node tools/smoke-analytics.js
```

---

## 7. Privasi

Catatan untuk pengunjung ada di [privacy.html](privacy.html). Secara teknis:

- Skrip yang dimuat hanya `gtag/js` milik properti GA4 itu, dan hanya bila ID valid.
- `allow_google_signals` dan `allow_ad_personalization_signals` dimatikan.
- Consent iklan (`ad_storage`, `ad_user_data`, `ad_personalization`) ditolak. `analytics_storage` diizinkan — tidak ada tembok cookie; penjelasannya di halaman privasi.
- IP dianonimkan (`anonymize_ip`), cookie analitik 90 hari.
- ID klien Google **tidak** ditempel ke URL Mayar. Yang ditempel hanya UTM dan `plan`.
- Isi pertanyaan Tanya ustadz tidak masuk analitik.
