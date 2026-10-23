/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz.
 */

// ============================================================================
// BLAZE SHIELD: GUVENLI VAULT URETICI (SECURE VAULT GENERATOR)
// ============================================================================
// Bu betik, yerel ".env" dosyasindaki hassas Firebase degerlerini okur,
// 3 parcali bayt dizilerine (Share A, B, C) bolerek "src/firebase/vault.js"
// dosyasina sayisal hex formatinda enjekte eder.
//
// Hicbir duz metin anahtar kaynak koda veya Git gecmisine yazilmaz.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');
const VAULT_FILE = path.join(ROOT_DIR, 'src', 'firebase', 'vault.js');

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

function shardSecret(plainText) {
  if (!plainText || typeof plainText !== 'string') return null;
  const bytes = Buffer.from(plainText, 'utf8');
  const len = bytes.length;
  const shareA = crypto.randomBytes(len);
  const shareB = crypto.randomBytes(len);
  const shareC = Buffer.alloc(len);

  for (let i = 0; i < len; i++) {
    const a = shareA[i];
    const b = shareB[i];
    const rotA = ((a << 3) | (a >> 5)) & 0xff;
    const mixB = (b + 0x5a) & 0xff;
    const mask = (rotA ^ mixB) & 0xff;
    shareC[i] = (bytes[i] ^ mask) & 0xff;
  }

  return {
    a: Array.from(shareA).map((n) => '0x' + n.toString(16).padStart(2, '0')),
    b: Array.from(shareB).map((n) => '0x' + n.toString(16).padStart(2, '0')),
    c: Array.from(shareC).map((n) => '0x' + n.toString(16).padStart(2, '0')),
  };
}

export function generateVault() {
  const env = parseEnv(ENV_FILE);
  const keys = [
    { prop: 'apiKey', env: 'VITE_FIREBASE_API_KEY' },
    { prop: 'authDomain', env: 'VITE_FIREBASE_AUTH_DOMAIN' },
    { prop: 'databaseURL', env: 'VITE_FIREBASE_DATABASE_URL' },
    { prop: 'projectId', env: 'VITE_FIREBASE_PROJECT_ID' },
    { prop: 'storageBucket', env: 'VITE_FIREBASE_STORAGE_BUCKET' },
    { prop: 'messagingSenderId', env: 'VITE_FIREBASE_MESSAGING_SENDER_ID' },
    { prop: 'appId', env: 'VITE_FIREBASE_APP_ID' },
    { prop: 'measurementId', env: 'VITE_FIREBASE_MEASUREMENT_ID' },
  ];

  const payload = {};
  let count = 0;

  for (const item of keys) {
    const val = env[item.env] || process.env[item.env];
    if (val) {
      payload[item.prop] = shardSecret(val);
      count++;
    } else {
      payload[item.prop] = null;
    }
  }

  console.log(`[Blaze Vault Generator] ${count} anahtar basariyla 3-parcali bayt havuzuna shard edildi.`);

  if (!fs.existsSync(VAULT_FILE)) {
    console.error(`[Blaze Vault Generator] Hedef dosya bulunamadi: ${VAULT_FILE}`);
    return;
  }

  let vaultCode = fs.readFileSync(VAULT_FILE, 'utf8');

  // VAULT_PAYLOAD = { ... }; blokunu bulup guncelle
  const payloadStr = 'export const VAULT_PAYLOAD = {\n' +
    keys.map(({ prop }) => {
      const entry = payload[prop];
      if (!entry) return `  ${prop}: null,`;
      return `  ${prop}: {\n` +
        `    a: [${entry.a.join(', ')}],\n` +
        `    b: [${entry.b.join(', ')}],\n` +
        `    c: [${entry.c.join(', ')}],\n` +
        `  },`;
    }).join('\n') +
    '\n};';

  vaultCode = vaultCode.replace(
    /export const VAULT_PAYLOAD = \{[\s\S]*?\n\};/,
    payloadStr
  );

  fs.writeFileSync(VAULT_FILE, vaultCode, 'utf8');
  console.log(`[Blaze Vault Generator] ${VAULT_FILE} guncellendi.`);
}

// Dogrudan calistirildiginda
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateVault();
}
