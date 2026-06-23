# Panduan Deploy Server Mayar — Langkah demi Langkah

Tujuan: memasang "server" agar pembayaran Mayar **otomatis membuka akses** & terverifikasi.
Ikuti urut. Tidak perlu jago koding — cukup klik & salin-tempel.

---

## ✅ Langkah 1 — Rotasi kunci Mayar (SUDAH)
API Key & Webhook Secret lama dibatalkan, yang baru disimpan di catatanmu.

---

## Langkah 2 — Buat akun Render & pasang server
1. Buka **https://render.com** → **Sign up** (login pakai **GitHub** paling mudah).
2. Klik **New +** → **Blueprint**.
3. Pilih repository **`thequranlens`** (branch `main`).
4. Render membaca file `render.yaml` otomatis & menyiapkan service **quran-lens-api**.
5. Saat diminta isi **Environment Variables**:
   - `MAYAR_WEBHOOK_SECRET` → tempel **Webhook Secret baru** dari Mayar.
   - `ALLOW_ORIGIN` → biarkan `*` dulu (boleh dipersempit nanti).
   - (`TOKEN_SECRET` dibuat otomatis oleh Render — biarkan.)
6. Klik **Apply / Create** → tunggu sampai status **Live** (1–3 menit).
7. Salin **URL** service-nya, mis. `https://quran-lens-api.onrender.com`.
8. **Tes**: buka `URL-itu/api/health` di browser → harus muncul `{"ok":true,...}`.

> ⚠️ Tier gratis Render "tidur" saat idle — request pertama bisa lambat ±30 detik. Wajar.

---

## Langkah 3 — Daftarkan webhook di Mayar
1. Dashboard **Mayar** → **Webhook**.
2. Isi URL: `https://<URL-render-mu>/api/mayar/webhook`
3. Simpan.

---

## Langkah 4 — Transaksi tes (untuk mengunci format data)
1. Di Render → service → **Environment** → set `MAYAR_WEBHOOK_DEBUG` = **`true`** → **Save** (server restart).
2. Lakukan **1 pembayaran tes** lewat link Mayar (nominal kecil bila bisa).
3. Render → tab **Logs** → cari baris `[webhook][DEBUG]`.
4. **Salin** isi `headers:` dan `body:` dari log itu → kirim ke chat
   (boleh sensor email/nama; **jangan** kirim nilai secret).
5. Setelah dipetakan benar, set `MAYAR_WEBHOOK_DEBUG` kembali ke **`false`**.

---

## Langkah 5 — Sambungkan ke aplikasi
Beri tahu aku URL Render-mu. Aku isi `apiBase` di `assets/js/payment.js` →
pembayaran lunas akan **otomatis membuka Premium & terverifikasi**.

---

### Ringkas alurnya nanti
```
Bayar di Mayar → Mayar kirim webhook ke server (LUNAS, tercatat)
   → app cek ke server → Premium terbuka otomatis (anti-bypass)
```
