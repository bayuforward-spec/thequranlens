# Rencana deploy & transaksi uji: aktivasi Premium (Mayar)

Status: **draf di branch `perbaikan-aktivasi-premium`**. Belum di-push atau di-deploy, dan belum ada transaksi.
Tanda: **[V]** = sudah dicek di dokumentasi atau dengan uji lokal, **[A]** = asumsi yang harus dibuktikan lewat transaksi uji.

## 0. Ringkasnya
- Webhook Mayar memakai **token rahasia di URL** (dicek *constant-time*). Server lalu
  **memverifikasi ulang** transaksi ke API Mayar `GET /hl/v2/transactions/{id}` sebelum
  mengaktifkan Premium [V docs.mayar.id/api-reference-v2/transaction/detail].
  Mayar tidak mendokumentasikan tanda tangan webhook [V docs.mayar.id/integration/webhook].
- Hak akses disimpan di **Upstash Redis (gratis)**. Isinya hanya hash Order ID, paket, productId,
  waktu aktivasi, dan `expiresAt`.
- Konten Premium (47 episode, ±152 KB) **dikeluarkan dari `content.js` publik** dan disajikan server dengan
  token sesi bertanda tangan. Episode gratis dan etalase `gratis.html` (Al-Ikhlas) tidak berubah.

## 1. Environment Render (nama saja, isi di Dashboard → Environment)
| Nama | Isi / sumber | Wajib |
|---|---|---|
| `TOKEN_SECRET` | sudah ada (generateValue) | ✔ |
| `ORDER_PEPPER` | string acak ≥ 32 karakter. **Jangan pernah diganti** setelah ada data | ✔ |
| `MAYAR_WEBHOOK_TOKEN` | string acak ≥ 32 karakter (mis. `openssl rand -hex 24`) | ✔ |
| `MAYAR_API_KEY` | API key Mayar (menu API Key/Integrasi di dashboard Mayar [A: nama menu]) | ✔ |
| `MAYAR_PRODUK` | JSON productId → paket (contoh di bawah) | ✔ |
| `STORAGE` | `upstash` | ✔ |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | dari konsol Upstash → database → REST API | ✔ |
| `ALLOW_ORIGIN` | `https://thequranlensindonesia.com` | ✔ |
| `REVIEWER_CODES` | kode peninjau baru, dipisah koma (kode lama di app.js sudah tidak berlaku) | opsional |
| `TOKEN_TTL_HARI` | `7` (default) | opsional |
| `MAYAR_WEBHOOK_SECRET` | biarkan. Hanya dipakai bila Mayar kelak mengirim header HMAC | opsional |
| `MAYAR_API_BASE` | kosong = `https://api.mayar.id/hl/v2`. Sandbox: `https://api.mayar.io/hl/v2` | opsional |
| ~~`MAYAR_WEBHOOK_DEBUG`~~ | **hapus**. Sudah tidak dibaca server | — |

**Secret File** (Dashboard → Environment → Secret Files): nama `premium-content.json`. Server membacanya di
`/etc/secrets/premium-content.json`. Batas total Secret Files 1 MB [V render.com/docs/configure-environment-variables].
File ini dibuat dengan `tools/pisah-konten-premium.js` dari salinan lengkap di luar repo.

`MAYAR_PRODUK`. Isi ID produk dari Mayar. ID produk = `paymentLink.id` di detail transaksi [A]:
```json
{"<id-bulanan>":{"paket":"Bulanan"},"<id-3bulan>":{"paket":"3 Bulan"},"<id-tahunan>":{"paket":"Tahunan"},"<id-seumur-hidup>":{"paket":"Seumur Hidup","bulan":null}}
```
Bila tetap memakai **satu** link membership `the-quran-lens` untuk dua paket, pakai cadangan nominal
(dicatat di log): `{"<id-the-quran-lens>":{"nominal":[{"min":399000,"paket":"Tahunan"},{"min":49000,"paket":"Bulanan"}]}}`.

## 2. Pengaturan di Mayar (dilakukan Bayu)
- **Webhook URL:** `https://quran-lens-api.onrender.com/api/mayar/webhook?token=<MAYAR_WEBHOOK_TOKEN>`
  Isi di menu Webhook pada dashboard Mayar [A: nama menu]. Event uji `testing` harus dibalas 200 (sudah ditangani server).
  URL lama tanpa `?token=` akan ditolak 401 setelah deploy, jadi ganti URL segera setelah deploy.
- **Redirect URL** produk/tier (fitur Redirect URL ada di membership tier & produk digital [V docs.mayar.id]):
  `https://thequranlensindonesia.com/?aktivasi=1`
  Apakah Mayar menambahkan ID transaksi ke URL redirect **tidak terdokumentasi [A]**. Bila tidak ada,
  app otomatis membuka form "Aktivasi dengan Order ID". Pembeli menempel ID transaksi atau kode invoice
  dari email Mayar.

## 3. Transaksi uji (satu kali, oleh Bayu)
1. Jalankan `GET https://quran-lens-api.onrender.com/api/health` → `storage:"upstash"`, `premium:true`.
   Tunggu ±1 menit bila server sedang tidur.
2. Pilih produk **termurah** (Bulanan) dengan **kupon diskon** sampai nominal minimum yang bisa dibayar.
   Atau buat produk uji tersembunyi (mis. Rp10.000) lalu daftarkan sementara di `MAYAR_PRODUK` sebagai `Bulanan`.
   Apakah transaksi Rp0 (kupon 100%) memicu `payment.received` berstatus `paid` belum diketahui [A], jadi hindari.
3. Bayar dari HP/laptop biasa. Setelah lunas, ikuti redirect (atau buka situs, lalu Langganan,
   lalu "Sudah bayar?" dan tempel Order ID).

### Yang dicek
- **Log Render:** muncul `[aktivasi] <10 huruf hash> → Bulanan (via productId, s/d <tanggal>)`.
  Bila muncul `[webhook] tidak diaktifkan: tidak-ditemukan`, berarti `data.id` webhook ≠ ID transaksi API [A] → laporkan.
  Bila `produk-tidak-dikenal`, berarti productId belum ada di `MAYAR_PRODUK` (ID-nya tercatat di log).
  Bila `belum-lunas`, berarti status lunas Mayar bukan `paid` [A] → sesuaikan `MAYAR_STATUS_LUNAS`.
- **Upstash → Data Browser:** ada kunci `ql:ent:<hash>` (dan `ql:alias:<hash>`). Isinya **tanpa** email, nama, atau HP.
- **Web:** badge "✓ Bulanan". Buka episode Premium (mis. Al-Fatihah:2) → tafsir lengkap muncul.
  Buka di browser lain tanpa aktivasi → tetap terkunci.
- **App (TWA/Play):** di tab Langganan, tempel Order ID yang sama → Premium aktif.
  Pembelian Google Play tetap lewat `/api/play/verify`.
- **Expiry:** respons `/api/verify` memuat `expiresAt` = waktu bayar + 1 bulan kalender.
  Kedaluwarsa sungguhan diuji otomatis (`npm test`), jadi tidak perlu menunggu 30 hari.
- **Idempoten:** kirim ulang webhook dari riwayat Mayar (bila ada tombol resend) → log tidak membuat rekaman baru.

## 4. Urutan rilis
1. Siapkan Upstash (akun gratis, 1 database), env & Secret File di Render. Mengubah env akan me-restart
   server **lama**. Ini aman karena server lama mengabaikan env baru.
2. Push branch, review PR, lalu merge ke `main`. Render (autoDeploy) dan GitHub Pages ikut terbit dari `main`.
   Server baru **menolak start** tanpa `TOKEN_SECRET`/`ORDER_PEPPER`. Bila deploy gagal, Render tetap menjalankan
   versi lama [A: perilaku zero-downtime Render].
3. Cek `/api/health`, lalu daftarkan Webhook URL & Redirect URL di Mayar, lalu transaksi uji (bagian 3).
4. Bila ada pembeli lama dengan `server/data/subs.json`: `node server/migrasi-subs.js subs.json` (uji kering),
   lalu `--tulis`. Di Render free file itu kemungkinan sudah hilang (filesystem efemeral [V render.com/docs/free]).
   Pembeli lama yang Premium-nya dulu aktif secara lokal akan dicek ulang otomatis lewat Order ID tersimpan.

## 5. Rollback
- **Backend:** Render → service → Deploys → pilih deploy sebelumnya → *Rollback*.
- **Frontend:** `git revert <merge-commit>` di `main` lalu push. GitHub Pages terbit ulang dan `content.js` lengkap kembali.
- Rollback **keduanya bersamaan**. Frontend baru butuh endpoint `/api/premium/episode`. Backend baru tetap
  menerima `GET /api/verify?order=` dari frontend lama.
- Data Upstash tidak perlu dihapus. Hapus Webhook URL di Mayar bila backend dikembalikan ke versi lama.

## 6. Kalimat untuk Kebijakan Privasi
> Untuk mengaktifkan Premium, kami hanya menyimpan versi tersandi (*hash*) dari Order ID Mayar beserta
> jenis paket, ID produk, waktu aktivasi, dan tanggal berakhir di penyedia basis data Upstash. Kami tidak
> menyimpan email, nama, atau nomor HP Anda. Data itu tetap berada di Mayar sebagai pemroses pembayaran.
> Perangkat Anda menyimpan token akses dan Order ID agar status Premium dapat diperiksa ulang.

## 7. Batasan yang perlu diketahui
- Teks lengkap 47 episode Premium (Al-Ikhlas tetap utuh sebagai etalase `gratis.html`) **sudah ada di riwayat git publik** dan versi `content.js` yang pernah terbit.
  Gating ini hanya melindungi konten dan revisi berikutnya.
- Untuk membership berulang (perpanjangan otomatis), tiap pembayaran ulang = transaksi baru [A]. Pembeli
  mungkin perlu menempel Order ID baru setelah masa aktif pertama habis. Penanganan event `membership.*` belum dibuat.
- Server gratis tidur setelah ±15 menit. Aktivasi pertama bisa butuh ±1 menit. Klien mencoba ulang dan
  menampilkan pesan [V render.com/docs/free]. Webhook Mayar yang kena timeout diharapkan dikirim ulang oleh Mayar [A].
  Kalaupun tidak, `/api/verify` dengan ID transaksi tetap mengaktifkan langsung dari API Mayar.
