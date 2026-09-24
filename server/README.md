# 🔐 Backend Verifikasi Langganan — The Quran Lens

Server kecil (Node bawaan + satu dependensi: `@anthropic-ai/sdk` untuk fitur
"Tanya ustadz AI") yang menutup celah bypass
pada gating sisi-klien. Premium hanya aktif bila Order ID **tercatat di server**
lewat **webhook Scalev yang terverifikasi tanda tangannya**.

## Cara kerja (alur anti-bypass)
```
Pembeli bayar di Scalev
   └─(1) Scalev kirim webhook ──► POST /api/scalev/webhook
                                   • verifikasi HMAC signature
                                   • simpan {order, paket, status, expiresAt}
   └─(2) Pembeli kembali ke app  ?aktivasi=paket&order=ORDER_ID
                                   app memanggil ──► GET /api/verify?order=ORDER_ID
                                   • server jawab {active:true, paket, expiresAt, token}
                                   • app baru membuka Premium
```
Order ID palsu **tidak ada** di server → `active:false` → akses ditolak.

## Menjalankan
```bash
cd server
cp .env.example .env     # lalu isi nilainya
node server.js           # atau: npm start
```
Butuh **Node ≥ 18**. Jalankan `npm install` sekali (memasang `@anthropic-ai/sdk`).
Verifikasi langganan tetap jalan tanpa paket itu; hanya fitur tanya yang mati.

Buat secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Menghubungkan ke aplikasi
Di `assets/js/payment.js`, isi `CONFIG.apiBase` dengan URL server, mis.:
```js
apiBase: 'https://api.domain-anda.com',
```
Selama `apiBase` kosong, aplikasi tetap berjalan dalam **mode demo** sisi-klien.

## Konfigurasi (env)
| Variabel | Fungsi |
|----------|--------|
| `PORT` | Port server (default 8787) |
| `SCALEV_WEBHOOK_SECRET` | Secret verifikasi tanda tangan webhook Scalev |
| `SCALEV_SIGNATURE_HEADER` | Nama header tanda tangan (default `x-scalev-signature`) |
| `TOKEN_SECRET` | Secret penandatangan token verifikasi |
| `DATA_FILE` | Lokasi penyimpanan JSON (default `./data/subs.json`) |
| `STATIC_DIR` | Folder app statis untuk dilayani sekalian (opsional) |
| `ALLOW_ORIGIN` | Nilai CORS (default `*`; batasi di produksi) |
| `ANTHROPIC_API_KEY` | Kunci API Anthropic untuk `POST /api/nahwu/tanya`. Kosong = fitur tanya mati |
| `TANYA_PER_JAM` | Batas pertanyaan per IP per jam (default 30) |

## Tanya ustadz AI (halaman Belajar Nahwu)
`POST /api/nahwu/tanya` meneruskan pertanyaan ke Claude (`claude-opus-5`) dan
mengalirkan jawaban sebagai `text/event-stream`. API key **hanya** di server;
frontend (`assets/js/nahwu-tanya.js`) cuma tahu `apiBase`. Tombol "Tanya ustadz AI"
baru muncul bila `/api/health` melaporkan `"tanya": true`.

Pengendali biaya: body ≤ 40 KB, ≤ 8 giliran, pesan ≤ 2.000 karakter, konteks
≤ 4.000 karakter, kuota per IP per jam (`TANYA_PER_JAM`, disimpan di memori —
reset saat server restart). Pantau pemakaian di console.anthropic.com dan pasang
batas belanja bulanan di sana.

## ⚠️ Yang WAJIB Anda sesuaikan dengan Scalev
Skema payload & metode tanda tangan tiap penyedia berbeda. Cek dokumentasi
webhook Scalev, lalu sesuaikan:
1. **Header tanda tangan** → `SCALEV_SIGNATURE_HEADER` + format (kode ini
   memverifikasi `HMAC-SHA256` hex dari *raw body*, toleran prefix `sha256=`).
2. **Field payload** → fungsi `normalizeEvent()` di `server.js` (cari komentar
   `TODO(Scalev)`). Map nama field untuk: order id, status, paket, email,
   masa berlaku.

## Endpoint
| Method | Path | Keterangan |
|--------|------|-----------|
| POST | `/api/scalev/webhook` | Terima event Scalev (signature diverifikasi) |
| GET | `/api/verify?order=ID` | Cek status langganan Order ID |
| GET | `/api/health` | Health check |

## Catatan produksi
- **Penyimpanan**: file JSON cukup untuk awal; ganti ke database (Postgres/SQLite/
  Supabase) saat skala bertambah — cukup ganti objek `Store`.
- **HTTPS & rate limit**: taruh di belakang reverse proxy (Nginx/Caddy) atau
  platform (Railway/Render/Fly/VPS).
- **Sinkron lintas perangkat**: untuk itu tambahkan autentikasi pengguna
  (email/OTP) dan kaitkan langganan ke akun, bukan hanya Order ID.
- **Lindungi teks tafsir**: agar konten premium tak tersalin dari kode klien,
  pindahkan teks lapisan premium ke endpoint server yang hanya melayani
  pengguna terverifikasi.
