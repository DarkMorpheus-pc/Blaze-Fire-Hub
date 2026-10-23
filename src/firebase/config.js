/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Guvenli Firebase Yapilandirmasi
//
// Kritik hassas bilgiler (API Key, Project ID vb.) kaynak kodda veya paketlenmis
// dosyalarda duz metin olarak ASLA tutulmaz.
// 3-Parcali Bayt Kasasi (Blaze Vault) uzerinden dinamik bellek cozumuyle yalnizca
// calisma zamaninda RAM uzerinde olusturulur ve hemen ardindan tamponlar sifirlanir.

import { assembleVaultConfig } from './vault.js';

export const firebaseConfig = assembleVaultConfig();
