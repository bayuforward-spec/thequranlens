/*
 * payment.js — Integrasi pembayaran Mayar (https://mayar.id)
 *
 * Cara pakai (untuk pemilik aplikasi):
 * 1. Buat produk di Mayar (cukup satu link untuk kedua paket; pembeli memilih
 *    Bulanan/Tahunan di halaman Mayar). Salin link-nya ke CONFIG.checkout.
 * 2. Deploy server/ (lihat server/README) lalu isi CONFIG.apiBase dengan URL-nya,
 *    mis. 'https://quranlens.onrender.com'. Webhook Mayar mencatat order yang LUNAS.
 * 3. Pembeli bayar di Mayar → salin Order ID dari struk → tempel di
 *    "Aktivasi dengan Order ID" → server memverifikasi → Premium aktif.
 *    (Bila Mayar mendukung redirect ke ?aktivasi=...&order=..., aktivasi otomatis.)
 *
 * CATATAN: API Key & Webhook Secret Mayar TIDAK pernah ditaruh di sini —
 * keduanya hanya di server sebagai environment variable.
 */
const Payment = {
  // Satu link checkout Mayar untuk kedua paket
  MAYAR_LINK: 'https://bayu-maulana.myr.id/m/the-quran-lens',
  CONFIG: {
    checkout: {
      'Bulanan': 'https://bayu-maulana.myr.id/m/the-quran-lens',
      'Tahunan': 'https://bayu-maulana.myr.id/m/the-quran-lens',
    },
    slug: {
      'bulanan': 'Bulanan',
      'tahunan': 'Tahunan',
    },
    // URL backend verifikasi (server/). KOSONGKAN untuk mode demo sisi-klien.
    // Setelah server di-deploy: 'https://quranlens.onrender.com' -> memanggil /api/verify
    apiBase: '',
  },

  // True bila backend verifikasi sudah dipasang
  backendAktif() { return !!this.CONFIG.apiBase; },

  // Verifikasi Order ID ke server. Mengembalikan {active, paket, expiresAt} | {active:false}.
  async verifikasiOrder(order) {
    if (!this.backendAktif()) return { active: false, error: 'backend-nonaktif' };
    try {
      const r = await fetch(`${this.CONFIG.apiBase}/api/verify?order=${encodeURIComponent(order)}`);
      return await r.json();
    } catch (e) {
      return { active: false, error: 'jaringan' };
    }
  },

  terkonfigurasi(paket) {
    const url = this.CONFIG.checkout[paket] || '';
    return url && !/CHECKOUT-/.test(url);
  },

  checkout(paket) {
    const url = this.CONFIG.checkout[paket];
    if (this.terkonfigurasi(paket)) {
      window.open(url, '_blank', 'noopener');
      return true;
    }
    return false; // belum dikonfigurasi -> pemanggil tangani fallback
  },

  cekRedirect() {
    const p = new URLSearchParams(window.location.search);
    const slug = p.get('aktivasi');
    const order = p.get('order');
    if (slug && this.CONFIG.slug[slug]) {
      return { paket: this.CONFIG.slug[slug], order: order || '-' };
    }
    return null;
  },

  bersihkanURL() {
    if (window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  },
};
window.Payment = Payment;
