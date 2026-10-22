#!/usr/bin/env node
/**
 * FireHub — Hassas Anahtar Şifreleme Aracı
 * .env dosyasındaki VITE_FIREBASE_* değerlerini XOR/Base64 ile şifreleyerek
 * .env.encrypted dosyası oluşturur. Böylece derleme çıktısında hiçbir
 * anahtar düz metin olarak yer almaz.
 */

import fs from 'fs';
import path from 'path';

const DEFAULT_SALT = "BlazeOS_Sovereign_Shield_2026";

function encrypt(val, salt = DEFAULT_SALT) {
  if (!val) return "";
  const xored = Array.from(val).map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ salt.charCodeAt(i % salt.length))
  ).join("");
  return Buffer.from(xored, 'latin1').toString('base64');
}

const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error("Hata: .env dosyası bulunamadı. Lütfen önce .env dosyanızı oluşturun.");
  process.exit(1);
}

const lines = fs.readFileSync(envPath, 'utf8').split('\n');
const outLines = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    outLines.push(line);
    continue;
  }
  const idx = trimmed.indexOf('=');
  if (idx !== -1) {
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    const encryptedKey = key + '_ENCRYPTED';
    const encryptedVal = encrypt(val);
    outLines.push(`${encryptedKey}="${encryptedVal}"`);
  }
}

const outPath = path.resolve(process.cwd(), '.env.encrypted');
fs.writeFileSync(outPath, outLines.join('\n'), 'utf8');
console.log(`[OK] Tüm anahtarlar şifrelendi ve ${outPath} dosyasına yazıldı!`);
console.log(`[INFO] Kaynak kodda ve derlenmiş dosyalarda düz metin anahtar kalmayacaktır.`);
