/*
 * billing.js — Google Play Billing untuk edisi Play Store (TWA).
 *
 * Memakai Digital Goods API + Payment Request API. API ini HANYA tersedia saat
 * app berjalan sebagai TWA (dibungkus dari Play Console dengan billing aktif).
 * Di browser biasa, PlayBilling.tersedia() = false → app otomatis pakai Mayar.
 *
 * Yang HARUS kamu sesuaikan setelah membuat produk langganan di Play Console:
 *   - SKU di bawah = Product ID langganan yang kamu buat di Play Console.
 *
 * CATATAN KEAMANAN (produksi): purchase token WAJIB diverifikasi di server via
 * Google Play Developer API sebelum benar-benar mengaktifkan Premium. Lihat TODO.
 */
const PlayBilling = {
  BILLING_METHOD: 'https://play.google.com/billing',
  // Ganti dengan Product ID langganan dari Play Console:
  SKU: { 'Bulanan': 'quranlens_bulanan', 'Tahunan': 'quranlens_tahunan' },
  service: null,

  async init() {
    if (!('getDigitalGoodsService' in window)) return false; // bukan TWA / tak ada billing
    try {
      this.service = await window.getDigitalGoodsService(this.BILLING_METHOD);
      return !!this.service;
    } catch (e) { this.service = null; return false; }
  },

  tersedia() { return !!this.service && 'PaymentRequest' in window; },

  async beli(paket) {
    const sku = this.SKU[paket];
    if (!sku || !this.tersedia()) return false;
    let details;
    try { details = await this.service.getDetails([sku]); } catch (e) { return false; }
    if (!details || !details.length) return false;
    const item = details[0];

    const req = new PaymentRequest(
      [{ supportedMethods: this.BILLING_METHOD, data: { sku } }],
      { total: { label: `Langganan ${paket}`, amount: { currency: item.price.currency, value: item.price.value } } }
    );
    const resp = await req.show();
    const token = resp.details && resp.details.token;
    await resp.complete('success');
    if (!token) return false;

    // Verifikasi ke server (aman): Premium hanya aktif bila Google mengonfirmasi.
    const apiBase = (window.Payment && Payment.CONFIG && Payment.CONFIG.apiBase) || '';
    if (apiBase) {
      try {
        const r = await fetch(apiBase + '/api/play/verify', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, sku }),
        });
        const j = await r.json();
        if (j && j.active) { Store.setPro(paket, 'PLAY'); return true; }
        return false;
      } catch (e) { return false; }
    }
    // Tanpa server (khusus uji internal): acknowledge lokal & aktifkan langsung.
    try { if (this.service.acknowledge) await this.service.acknowledge(token, 'onetime'); } catch (e) {}
    Store.setPro(paket, 'PLAY:' + token.slice(0, 12));
    return true;
  },

  // Pulihkan langganan aktif (mis. setelah re-install) dari entitlement Play.
  async pulihkan() {
    if (!this.tersedia() || !this.service.listPurchases) return false;
    try {
      const purchases = await this.service.listPurchases();
      for (const p of purchases) {
        const paket = Object.keys(this.SKU).find(k => this.SKU[k] === p.itemId);
        if (paket) { Store.setPro(paket, 'PLAY:restore'); return paket; }
      }
    } catch (e) {}
    return false;
  },
};
window.PlayBilling = PlayBilling;
