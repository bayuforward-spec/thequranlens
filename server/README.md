# 🔐 Backend The Quran Lens — aktivasi Premium, konten bertoken, Tanya ustadz AI

Server Node tanpa dependensi untuk aktivasi (hanya `@anthropic-ai/sdk` untuk fitur Tanya).
Langkah deploy & transaksi uji: **[../RENCANA-TRANSAKSI-UJI.md](../RENCANA-TRANSAKSI-UJI.md)**.

## Alur aktivasi (Mayar)
1. Pembeli bayar di Mayar. Mayar memanggil `POST /api/mayar/webhook?token=<MAYAR_WEBHOOK_TOKEN>`.
   Token dibandingkan *constant-time*. Header HMAC (`x-mayar-signature` dkk.) juga diterima
   bila `MAYAR_WEBHOOK_SECRET` di-set. **Tidak ada mode debug/bypass.**
2. Server **memverifikasi ulang** ke API Mayar: `GET {MAYAR_API_BASE}/transactions/{id}`
   (Bearer `MAYAR_API_KEY`). Status harus `paid` (`MAYAR_STATUS_LUNAS`), dan
   `paymentLink.id` harus ada di `MAYAR_PRODUK`. Produk lain di akun Mayar yang sama ditolak.
3. Disimpan: hash Order ID (HMAC `ORDER_PEPPER`), paket, productId, `aktifSejak`, `expiresAt`.
   **Tanpa email, nama, atau HP.** Event duplikat ditangani idempoten (`SET NX`).
4. Pembeli kembali ke `/?aktivasi=1&order=<id>` atau menempel Order ID / kode invoice.
   `POST /api/verify` lalu menerbitkan **token sesi bertanda tangan**. Bila webhook gagal,
   `/api/verify` dengan ID transaksi (UUID) langsung memverifikasi ke API Mayar.
5. Konten Premium **tidak ada di content.js publik**. Konten diambil dari
   `GET /api/premium/episode/:id` dengan `Authorization: Bearer <token>`.
   Tanpa token → 401; hak dicabut/kedaluwarsa → 403.

## Endpoint
| Method | Path | Ket. |
|---|---|---|
| GET | `/api/health` | status, jenis storage, konten premium termuat |
| POST | `/api/mayar/webhook?token=…` | alias lama `/api/webhook` |
| POST | `/api/verify` `{order}` | GET `?order=` tetap didukung |
| POST | `/api/refresh` `{token}` | perpanjang token; cek hak di storage |
| POST | `/api/reviewer` `{kode}` | akses peninjau (`REVIEWER_CODES`, cabut = hapus kode) |
| GET | `/api/premium/episode/:id` | Bearer token |
| POST | `/api/play/verify` `{token, sku}` | Google Play Billing → token yang sama |
| POST | `/api/nahwu/tanya` | Tanya ustadz AI (SSE) |

## Env (nama saja; nilai di Dashboard Render)
`TOKEN_SECRET`, `ORDER_PEPPER` (wajib di produksi; server menolak start tanpa keduanya),
`MAYAR_WEBHOOK_TOKEN`, `MAYAR_API_KEY`, `MAYAR_PRODUK` / `MAYAR_PRODUK_FILE`,
`MAYAR_WEBHOOK_SECRET` (opsional), `MAYAR_API_BASE`, `MAYAR_STATUS_LUNAS`,
`STORAGE` (`file` | `upstash`), `DATA_FILE`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`,
`PREMIUM_CONTENT_FILE`, `REVIEWER_CODES`, `REVIEWER_HARI`, `TOKEN_TTL_HARI`, `ALLOW_ORIGIN`,
`ANTHROPIC_API_KEY`, `TANYA_PER_JAM`, `GOOGLE_SA_EMAIL`, `GOOGLE_SA_KEY`, `PLAY_PACKAGE_NAME`.

`MAYAR_PRODUK` contoh (productId = ID produk/payment link di Mayar):
```json
{
  "<id-produk-bulanan>": { "paket": "Bulanan" },
  "<id-produk-3-bulan>": { "paket": "3 Bulan" },
  "<id-produk-12-bulan>": { "paket": "Tahunan" }
}
```
productId diisi setelah produk Mayar dibuat (jangan diketik di chat). Paket 12 bulan dipetakan ke nama baku **Tahunan**. Tidak ada paket seumur hidup.

Cadangan `nominal` hanya bila satu produk Mayar masih dipakai untuk beberapa paket (setiap pemakaian dicatat di log):
```json
{ "<id-produk-gabungan>": { "nominal": [ { "min": 399000, "paket": "Tahunan" }, { "min": 135000, "paket": "3 Bulan" }, { "min": 49000, "paket": "Bulanan" } ] } }
```

## Konten Premium
Sumber konten lengkap disimpan **di luar repo publik**. Pisahkan dengan:
```bash
node tools/pisah-konten-premium.js --sumber <luar-repo>/content-lengkap.js \
  --publik assets/js/content.js --premium <luar-repo>/premium-content.json
```
Unggah `premium-content.json` sebagai Render **Secret File** (batas total 1 MB).
Untuk dev, simpan di `server/data/premium-content.json` (di-.gitignore).
Validasi konten lengkap: `QL_KONTEN=<luar-repo>/content-lengkap.js node tools/validasi-konten.js`.

## Menjalankan & menguji
```bash
cd server
npm test                                   # node:test, Mayar & Upstash ditiru (tanpa jaringan)
TOKEN_SECRET=dev ORDER_PEPPER=dev node server.js
node migrasi-subs.js data/subs.json        # uji kering migrasi data lama (tanpa email)
```

## Tanya ustadz AI (halaman Belajar Nahwu)
`POST /api/nahwu/tanya` meneruskan pertanyaan ke Claude (`claude-sonnet-5`) dan
mengalirkan jawaban sebagai `text/event-stream`. API key **hanya** di server;
frontend (`assets/js/nahwu-tanya.js`) cuma tahu `apiBase`. Tombol "Tanya ustadz AI"
baru muncul bila `/api/health` melaporkan `"tanya": true`.

Pengendali biaya: body ≤ 40 KB, ≤ 8 giliran, pesan ≤ 2.000 karakter, konteks
≤ 4.000 karakter, kuota per IP per jam (`TANYA_PER_JAM`, disimpan di memori —
reset saat server restart). Pantau pemakaian di console.anthropic.com dan pasang
batas belanja bulanan di sana.
