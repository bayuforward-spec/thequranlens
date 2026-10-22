# Analitik & atribusi — The Quran Lens

Situs live `https://thequranlensindonesia.com` adalah **file statis di repo ini**,
diterbitkan **GitHub Pages** dari branch `main` (bukan Netlify/Vercel, bukan
Render). Backend Render (`quran-lens-api`) hanya verifikasi Mayar & Tanya
ustadz — **jangan** menaruh Measurement ID di sana.

Measurement ID tertulis di `assets/js/ga-config.js`. GitHub Pages menyajikan
file itu **apa adanya** dari branch `main` (tanpa build, tanpa pindah ke
GitHub Actions). String kosong = gtag tidak dimuat.

Yang dikirim hanya analitik kunjungan. Tidak ada iklan, remarketing, Google
Signals, atau personalisasi iklan.

---

## 1. Di mana ID-nya, dan cara mematikan

ID yang dipakai produksi ada di **`assets/js/ga-config.js`**:

```javascript
window.QL_GA_MEASUREMENT_ID = "G-6QBQF976B0";
```

Itu Measurement ID properti GA4 situs ini. ID ini memang terlihat di sumber halaman — itu normal untuk gtag. Tidak perlu mengisi environment variable, dan **jangan** mengganti sumber GitHub Pages ke Actions hanya untuk ini. Push ke `main` sudah cukup: Pages menyalin file tersebut tanpa build.

**Mematikan analitik:** ubah nilai itu menjadi string kosong, lalu push ke `main`.

```javascript
window.QL_GA_MEASUREMENT_ID = "";
```

Kosong, atau teks yang bukan `G-` diikuti huruf/angka, membuat `analytics.js` tidak memuat gtag dan tidak menghubungi Google. Peristiwa lokal (`?analytics_debug=1`) tetap bisa dicatat di konsol.

**Menimpa lewat variable (opsional).** Hanya berlaku bila sumber Pages suatu saat diganti ke **GitHub Actions**. Variable repository `GA_MEASUREMENT_ID` (atau `NEXT_PUBLIC_GA_MEASUREMENT_ID`) di **Settings → Secrets and variables → Actions → Variables**:

| Nilai variable | Hasil saat workflow Actions berjalan |
|---|---|
| tidak diisi | File di repo dipakai apa adanya (`G-6QBQF976B0`, atau `""` bila sudah dikosongkan) |
| `G-XXXXXXXX` yang valid | Menimpa nilai di file yang di-deploy |
| `off` | Menulis string kosong — analitik mati pada deploy Actions itu |

Deploy dari branch **tidak** membaca variable ini.

Yang masih perlu di dashboard (bukan di kode):

1. Produk Mayar **the-quran-lens** → **Track** → **URL Param**, daftarkan lalu simpan:
   `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `plan`.
   Tanpa daftar itu, checkout tetap terbuka, tetapi Mayar tidak menyimpan asal trafik di transaksi.
2. Di GA4 → Admin → **Events**, tandai sebagai **key event**: `premium_checkout_click`, `lanjutkan_membaca`, `save_episode`, `episode_read`, `tanya_ustadz_used`. (`page_view` sudah otomatis.)

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

Buka

`https://thequranlensindonesia.com/?utm_source=youtube&utm_medium=deskripsi&utm_campaign=comeback_okt26&analytics_debug=1`

Konsol browser → saring `[analytics]`. `ga_status` harus `active: 1`, dan ada permintaan ke `googletagmanager.com/gtag/js?id=G-6QBQF976B0`. Peristiwa juga masuk GA4 → Admin → **DebugView** (karena `debug_mode`).

Bila ID di `ga-config.js` dikosongkan, URL yang sama menulis `active: 0`, tidak ada permintaan ke Google, dan peristiwa hanya ada di konsol serta `window.__analyticsLog`.

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
