#!/usr/bin/env node
/*
 * FireHub — Resmi Uygulama İkonları İndirme & Derleme Aracı
 * BCDL (Kinetic Glass) standardında 82 uygulamanın resmi logolarını
 * Flathub AppStream CDN ve yerel vektörel kaynaklardan 128x128 PNG olarak derler.
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { execSync } from 'node:child_process';
import { APP_CATALOG } from '../src/data/catalog.js';

const OUT_DIR = path.resolve(process.cwd(), 'public', 'icons');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Özel veya Flathub harici kaynak tanımları
const LOCAL_VECTOR_SOURCES = {
  docker: '/home/darkmorpheus/BlazeFedora/work/squashfs_root/usr/share/icons/Papirus/64x64/apps/docker-desktop.svg',
  stacer: '/home/darkmorpheus/BlazeFedora/work/squashfs_root/usr/share/icons/Papirus/64x64/apps/stacer.svg',
  timeshift: '/home/darkmorpheus/BlazeFedora/work/squashfs_root/usr/share/icons/Papirus/64x64/apps/timeshift.svg',
  notion: '/home/darkmorpheus/BlazeFedora/work/squashfs_root/usr/share/icons/Papirus/64x64/apps/notion.svg',
  figma: '/home/darkmorpheus/BlazeFedora/work/squashfs_root/usr/share/icons/Papirus/64x64/apps/figma.svg',
  mullvadvpn: '/home/darkmorpheus/BlazeFedora/work/squashfs_root/usr/share/icons/Papirus/64x64/apps/mullvad-vpn.svg',
};

const LOCAL_PNG_SOURCES = {
  gparted: '/home/darkmorpheus/BlazeFedora/work_f45/rootfs/usr/share/swcatalog/icons/fedora/128x128/gparted.png',
};

const REMOTE_CUSTOM_URLS = {
  playonlinux: 'https://dl.flathub.org/repo/appstream/x86_64/icons/128x128/com.playonlinux.PlayOnLinux4.png',
  powertoys: 'https://raw.githubusercontent.com/microsoft/PowerToys/main/doc/images/icons/PowerToys%20Run.png',
};

function downloadUrl(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const request = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlink(destPath, () => {});
        return downloadUrl(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log(`[FireHub Icons] İkon indirme ve derleme işlemi başlatılıyor...`);
  console.log(`[Hedef Klasör]: ${OUT_DIR}`);

  const totalApps = Object.keys(APP_CATALOG).length;
  let successCount = 0;
  const failedApps = [];

  for (const [appId, app] of Object.entries(APP_CATALOG)) {
    const dest = path.join(OUT_DIR, `${appId}.png`);

    try {
      // 1. Yerel SVG kaynağı varsa rsvg-convert ile derle
      if (LOCAL_VECTOR_SOURCES[appId] && fs.existsSync(LOCAL_VECTOR_SOURCES[appId])) {
        execSync(`rsvg-convert -w 128 -h 128 "${LOCAL_VECTOR_SOURCES[appId]}" -o "${dest}"`);
        successCount++;
        process.stdout.write(`✔ [VECTOR]  ${app.name} (${appId})\n`);
        continue;
      }

      // 2. Yerel PNG kaynağı varsa kopyala
      if (LOCAL_PNG_SOURCES[appId] && fs.existsSync(LOCAL_PNG_SOURCES[appId])) {
        fs.copyFileSync(LOCAL_PNG_SOURCES[appId], dest);
        successCount++;
        process.stdout.write(`✔ [LOCAL]   ${app.name} (${appId})\n`);
        continue;
      }

      // 3. Özel uzak URL
      if (REMOTE_CUSTOM_URLS[appId]) {
        await downloadUrl(REMOTE_CUSTOM_URLS[appId], dest);
        successCount++;
        process.stdout.write(`✔ [REMOTE]  ${app.name} (${appId})\n`);
        continue;
      }

      // 4. Standart Flathub AppStream CDN
      if (app.detect && app.detect.flatpakId) {
        const flathubUrl = `https://dl.flathub.org/repo/appstream/x86_64/icons/128x128/${app.detect.flatpakId}.png`;
        await downloadUrl(flathubUrl, dest);
        successCount++;
        process.stdout.write(`✔ [FLATHUB] ${app.name} (${appId})\n`);
        continue;
      }

      throw new Error(`Uygulama için tanımlı resmi ikon kaynağı bulunamadı.`);
    } catch (err) {
      failedApps.push({ appId, name: app.name, error: err.message });
      process.stdout.write(`✖ [FAILED]  ${app.name} (${appId}): ${err.message}\n`);
    }
  }

  console.log(`\n========================================`);
  console.log(`İkon Derleme Raporu: ${successCount} / ${totalApps} başarıyla tamamlandı.`);
  if (failedApps.length > 0) {
    console.error(`Başarısız Olanlar:`, failedApps);
    process.exit(1);
  } else {
    console.log(`[BAŞARILI] ${totalApps} uygulamanın tamamı için 128x128 resmi logolar yerel olarak hazırlandı!`);
  }
}

main().catch(err => {
  console.error("Beklenmeyen hata:", err);
  process.exit(1);
});
