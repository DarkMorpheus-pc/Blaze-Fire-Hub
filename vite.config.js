/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

import { defineConfig } from 'vite';
import JavaScriptObfuscator from 'javascript-obfuscator';

function obfuscatorPlugin() {
  return {
    name: 'vite-plugin-javascript-obfuscator',
    apply: 'build',
    enforce: 'post',
    renderChunk(code, chunk) {
      if (!chunk.fileName.endsWith('.js')) return null;
      try {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.5,
          numbersToExpressions: true,
          simplify: true,
          stringArray: true,
          stringArrayEncoding: ['base64'],
          stringArrayThreshold: 0.75,
          splitStrings: true,
          splitStringsChunkLength: 8,
          transformObjectKeys: true,
          unicodeEscapeSequence: false,
          target: 'browser'
        });
        return {
          code: obfuscationResult.getObfuscatedCode(),
          map: null
        };
      } catch (err) {
        console.error('[Obfuscator Plugin Error]:', err);
        return null;
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [obfuscatorPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
