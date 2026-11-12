# Panduan singkat: akun Upstash (sekitar 5 menit)

Hak akses Premium disimpan di **Upstash Redis paket gratis**. Akun ini dibuat oleh Bayu sendiri. Nilai rahasia **jangan diketik di chat** — isi langsung di Render, atau lewat formulir aman bila diminta.

## 1. Daftar (sekitar 1 menit)
1. Buka [https://upstash.com](https://upstash.com) → **Sign Up** (paling mudah pakai GitHub).
2. Selesaikan daftar sampai masuk ke konsol Upstash.

## 2. Buat database Redis (sekitar 2 menit)
1. Di konsol, pilih **Redis** → **Create Database**.
2. Isi nama, misalnya `quran-lens-akses`.
3. Pilih **region yang terdekat dengan layanan Render** `quran-lens-api`.
   - Cek region itu di Render → service `quran-lens-api` → **Settings** → **Region**.
   - File `render.yaml` dan `DEPLOY.md` **tidak** menetapkan region, jadi jangan menebak dari repo.
   - Kalau Render ternyata di Singapore, pilih Singapore di Upstash. Kalau regionnya lain, pilih yang sama atau yang terdekat.
4. Pakai paket **Free**. Simpan / Create.

## 3. Salin URL dan token REST (sekitar 1 menit)
1. Buka database yang baru dibuat.
2. Di bagian **REST API** (atau Details), salin:
   - **UPSTASH REDIS REST URL**
   - **UPSTASH REDIS REST TOKEN** (token baca-tulis, bukan token read-only)

## 4. Isi di Render (sekitar 1 menit) — bukan di chat
Di Render → service `quran-lens-api` → **Environment**, isi nama variabel yang dibaca kode (`server/lib/storage.js`):

| Nama di Render | Isi |
|---|---|
| `STORAGE` | `upstash` (sudah terisi lewat `render.yaml`) |
| `UPSTASH_REDIS_REST_URL` | REST URL dari langkah 3 |
| `UPSTASH_REDIS_REST_TOKEN` | REST token dari langkah 3 |

Setelah rilis, `GET /api/health` harus menampilkan `"storage":"upstash"`.

Kunci ini tidak diketik di chat, tidak dimasukkan ke Git, dan tidak dikirim lewat email biasa.

## Variabel terkait yang juga ada di Render (bukan dari Upstash)
Untuk kelengkapan rilis, ini nama env lain yang terkait aktivasi Premium. Nilainya juga hanya di Render / formulir aman:

- `MAYAR_API_KEY` — API key Mayar, dicek sendiri di menu **Integrasi** dashboard Mayar. Bila perlu key baru, isi lewat formulir aman atau langsung di Render, bukan di chat.
- `MAYAR_PRODUK` — JSON peta productId → paket (contoh di `RENCANA-TRANSAKSI-UJI.md`). productId diisi setelah tiga produk Mayar dibuat.
- `MAYAR_WEBHOOK_TOKEN`, `ORDER_PEPPER`, `TOKEN_SECRET` — sudah dijelaskan di rencana rilis; jangan diganti `ORDER_PEPPER` setelah ada data.
