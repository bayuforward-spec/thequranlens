# Panduan ke Google Play & App Store — The Quran Lens

Status jujur & langkah nyata untuk membawa app (yang kini sudah **PWA**) ke toko aplikasi.

---

## ✅ Yang SUDAH siap (sisi teknis)
- **PWA lengkap**: `manifest.webmanifest` + service worker (`sw.js`) → installable, jalan offline.
- **Ikon toko**: `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-180.png`.
- Domain HTTPS live: `https://thequranlensindonesia.com`.

---

## 🔴 3 Hal yang HARUS diputuskan/disiapkan (bukan teknis)

### 1. PEMBAYARAN — ini penghalang terbesar
Apple **&** Google **mewajibkan** langganan konten digital memakai **In-App Purchase (IAP)** mereka (potongan **15–30%**). Menjual langganan lewat **Mayar di dalam app → berisiko DITOLAK.**

**Pilihan strategi:**
- **A. Model "reader app" (paling ringan):** app di toko dibuat **tanpa tombol beli** apa pun. Langganan dibeli **hanya di website**. App hanya menampilkan konten bagi yang sudah login/aktif. Banyak dipakai; perlu hati-hati agar tak "mengarahkan ke pembayaran luar" di dalam app.
- **B. Pasang IAP resmi:** implementasi StoreKit (iOS) + Google Play Billing (Android). Paling aman diterima, tapi **rework besar** + potongan 15–30%.
- **C. Gratis total di toko** (tanpa premium sama sekali) → monetisasi lain (donasi/website).

> Putuskan ini **dulu** sebelum submit. Rekomendasi awal: **A** (reader app) untuk masuk cepat, IAP menyusul bila skala membesar.

### 2. AKUN DEVELOPER (biaya & KYC — sisi kamu)
- **Google Play:** ~**US$25 sekali seumur hidup**.
- **Apple Developer:** ~**US$99/tahun**.

### 3. ALAT (khusus iOS)
- **iOS WAJIB di-build & submit dari Mac + Xcode.** Tanpa Mac, iOS tak bisa dirilis (bisa sewa Mac cloud/MacinCloud).
- Android bisa dari Windows/Linux/cloud.

---

## 🤖 ANDROID (paling realistis lebih dulu) — via PWABuilder/TWA
Karena app sudah PWA, Android bisa dibungkus jadi **TWA** (Trusted Web Activity) tanpa koding ulang:
1. Buka **https://www.pwabuilder.com** → masukkan `https://thequranlensindonesia.com`.
2. PWABuilder mengecek PWA (manifest & SW sudah siap) → klik **Package for Stores → Android**.
3. Unduh paket **`.aab`** (+ file `assetlinks.json`).
4. **Digital Asset Links:** taruh `assetlinks.json` yang diberikan ke `/.well-known/assetlinks.json` di situs (aku bantu commit-kan) agar app tak menampilkan address bar.
5. Buat akun **Google Play Console** ($25) → **Create app** → unggah `.aab` → isi listing (deskripsi, ikon, **screenshot**, kebijakan privasi) → submit.

## 🍎 iOS (lebih berat) — Capacitor/PWABuilder + Mac
1. PWABuilder juga bisa generate **proyek iOS**, atau pakai **Capacitor**.
2. Buka proyek di **Xcode (Mac)** → set bundle id, ikon, signing (akun Apple $99/th).
3. Pastikan lolos **Guideline 4.2 (minimum functionality)** — PWA offline kita membantu; tambахkan nilai native bila perlu.
4. Archive → upload ke **App Store Connect** → isi metadata → submit review.

---

## 📋 Checklist sebelum submit
- [ ] Keputusan **pembayaran** (A/B/C di atas).
- [ ] **Kebijakan Privasi** (halaman/URL wajib untuk kedua toko).
- [ ] **Screenshot** app (beberapa ukuran HP) untuk listing.
- [ ] Akun developer (Google $25 / Apple $99).
- [ ] (iOS) akses **Mac + Xcode**.
- [ ] Deskripsi, kategori, rating usia.

---

## Yang bisa aku bantu (sisi kode/aset)
- Menyesuaikan app jadi **mode "reader"** (sembunyikan pembelian di dalam app bila pilih strategi A).
- Membuat **halaman Kebijakan Privasi**.
- Menaruh **`assetlinks.json`** untuk TWA.
- Menyiapkan **screenshot** listing.
- (Bila pilih B) integrasi **IAP** — ini pekerjaan besar, dibahas terpisah.
