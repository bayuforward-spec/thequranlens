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
 * KEAMANAN: purchase token selalu diverifikasi server (/api/play/verify →
 * Google Play Developer API). Server menerbitkan token sesi yang sama dengan
 * edisi web (premium.js), dipakai untuk mengambil konten Premium.
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

    return this.verifikasiServer(token, sku, paket);
  },

  // Verifikasi purchase token ke server → token sesi Premium. Tanpa server = tidak aktif.
  async verifikasiServer(token, sku, paket) {
    if (!window.Premium || !Premium.aktif()) return false;
    try {
      const { data } = await Premium.api('/api/play/verify', { method: 'POST', body: { token, sku } });
      if (data && data.active && data.token) { Premium.simpan({ ...data, paket: data.paket || paket }, 'PLAY'); return true; }
    } catch (e) {}
    return false;
  },

  // Pulihkan langganan aktif (mis. setelah re-install) dari entitlement Play.
  async pulihkan() {
    if (!this.tersedia() || !this.service.listPurchases) return false;
    try {
      const purchases = await this.service.listPurchases();
      for (const p of purchases) {
        const paket = Object.keys(this.SKU).find(k => this.SKU[k] === p.itemId);
        // Entitlement lokal tidak dipercaya begitu saja: purchase token diverifikasi server.
        if (paket && p.purchaseToken && await this.verifikasiServer(p.purchaseToken, p.itemId, paket)) return paket;
      }
    } catch (e) {}
    return false;
  },
};
window.PlayBilling = PlayBilling;
