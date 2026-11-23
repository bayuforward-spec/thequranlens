/*
 * storage.js — Lapisan penyimpanan hak akses (entitlement) yang bisa diganti.
 *
 *   STORAGE=file     (default, untuk dev)  → file JSON lokal (DATA_FILE)
 *   STORAGE=upstash  (disarankan produksi) → Upstash Redis lewat REST API
 *                     (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *
 * Antarmuka (semua async):
 *   get(key)            → objek | null
 *   put(key, obj, {nx}) → true bila tersimpan (nx: hanya bila kunci belum ada)
 *   del(key)            → true
 *   jenis               → 'file' | 'upstash'
 *
 * Yang disimpan HANYA data minimum (lihat akses.js): hash order, paket,
 * productId, expiresAt, waktu aktivasi. Tidak ada email, nama, atau nomor HP.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const PREFIX = 'ql:';

class FileStore {
  constructor(file) {
    this.jenis = 'file';
    this.file = file;
    this._db = null;
  }
  _load() {
    if (this._db) return this._db;
    try {
      const raw = JSON.parse(fs.readFileSync(this.file, 'utf8'));
      this._db = raw && typeof raw.records === 'object' ? raw : { records: {} };
    } catch (e) {
      this._db = { records: {} };
    }
    return this._db;
  }
  _save() {
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    const tmp = this.file + '.tmp-' + process.pid;
    fs.writeFileSync(tmp, JSON.stringify(this._db, null, 2));
    fs.renameSync(tmp, this.file); // atomik di filesystem yang sama
  }
  async get(key) {
    const v = this._load().records[PREFIX + key];
    return v === undefined ? null : JSON.parse(JSON.stringify(v));
  }
  async put(key, obj, opts = {}) {
    const db = this._load();
    if (opts.nx && db.records[PREFIX + key] !== undefined) return false;
    db.records[PREFIX + key] = obj;
    this._save();
    return true;
  }
  async del(key) {
    const db = this._load();
    delete db.records[PREFIX + key];
    this._save();
    return true;
  }
}

/* Upstash Redis REST: POST <url> body ["CMD", arg1, ...], header Bearer token.
 * Dok: https://upstash.com/docs/redis/features/restapi */
class UpstashStore {
  constructor(url, token, fetchImpl) {
    this.jenis = 'upstash';
    this.url = String(url || '').replace(/\/+$/, '');
    this.token = token;
    this.fetch = fetchImpl || globalThis.fetch;
    if (!this.url || !this.token) throw new Error('UPSTASH_REDIS_REST_URL/TOKEN belum di-set');
  }
  async _cmd(args) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 8000);
    try {
      const r = await this.fetch(this.url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
        signal: ctl.signal,
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.error) throw new Error('Upstash: ' + (j.error || ('HTTP ' + r.status)));
      return j.result;
    } finally {
      clearTimeout(t);
    }
  }
  async get(key) {
    const v = await this._cmd(['GET', PREFIX + key]);
    if (v === null || v === undefined) return null;
    try { return JSON.parse(v); } catch (e) { return null; }
  }
  async put(key, obj, opts = {}) {
    const args = ['SET', PREFIX + key, JSON.stringify(obj)];
    if (opts.nx) args.push('NX');
    const r = await this._cmd(args);
    return r === 'OK';
  }
  async del(key) {
    await this._cmd(['DEL', PREFIX + key]);
    return true;
  }
}

function buatStore(env = process.env, deps = {}) {
  const jenis = String(env.STORAGE || 'file').toLowerCase();
  if (jenis === 'upstash') {
    return new UpstashStore(env.UPSTASH_REDIS_REST_URL, env.UPSTASH_REDIS_REST_TOKEN, deps.fetch);
  }
  if (jenis !== 'file') throw new Error('STORAGE tidak dikenal: ' + jenis);
  const file = env.DATA_FILE || path.join(__dirname, '..', 'data', 'akses.json');
  return new FileStore(file);
}

module.exports = { buatStore, FileStore, UpstashStore, PREFIX };
