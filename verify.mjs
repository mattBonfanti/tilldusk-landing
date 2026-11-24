// Nessun segnaposto online: un campo "DA COMPLETARE" o un wrangler ancora
// con "CAMBIA" fermano la build. E ogni immagine dichiarata deve esistere.
import { readFileSync, existsSync } from 'node:fs';
const app = (await import('./src/app.mjs')).default;
const err = [];
const json = JSON.stringify(app);
for (const m of json.matchAll(/"([^"]*DA COMPLETARE[^"]*)"/g)) err.push('src/app.mjs: ' + m[1]);
if (/CAMBIA/.test(readFileSync('wrangler.jsonc', 'utf8'))) err.push('wrangler.jsonc: nome o dominio ancora da impostare (CAMBIA)');
for (const s of app.screens ?? []) if (!existsSync('public' + s.src)) err.push(`immagine mancante: public${s.src}`);
if (err.length) { console.error('\n\x1b[31m✗ verify:\x1b[0m\n  - ' + err.join('\n  - ') + '\n'); process.exit(1); }
console.log(`\x1b[32m✓\x1b[0m verify: ${app.name}, nessun segnaposto.`);
