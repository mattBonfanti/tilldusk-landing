// Nessun segnaposto online: un campo "DA COMPLETARE" o un wrangler ancora
// con "CAMBIA" fermano la build. E ogni immagine dichiarata deve esistere.
import { readFileSync, existsSync } from 'node:fs';
const app = (await import('./src/app.mjs')).default;
const err = [];
const json = JSON.stringify(app);
for (const m of json.matchAll(/"([^"]*DA COMPLETARE[^"]*)"/g)) err.push('src/app.mjs: ' + m[1]);
if (/CAMBIA/.test(readFileSync('wrangler.jsonc', 'utf8'))) err.push('wrangler.jsonc: nome o dominio ancora da impostare (CAMBIA)');
for (const s of app.screens ?? []) if (!existsSync('public' + s.src)) err.push(`immagine mancante: public${s.src}`);
// Ogni link /go/<nome> nelle pagine costruite deve avere un redirect (con e senza "/" finale).
import { readdirSync, statSync } from 'node:fs';
const walk = (d) => readdirSync(d).flatMap((f) => { const p = d + '/' + f; return statSync(p).isDirectory() ? walk(p) : [p]; });
if (existsSync('dist')) {
  const rules = existsSync('dist/_redirects') ? readFileSync('dist/_redirects', 'utf8') : '';
  const have = new Set(rules.split('\n').filter((l) => l.startsWith('/go/')).map((l) => l.split(/\s+/)[0]));
  const used = new Set();
  for (const f of walk('dist').filter((f) => f.endsWith('.html')))
    for (const m of readFileSync(f, 'utf8').matchAll(/href="(\/go\/[a-z0-9-]+)\/?"/g)) used.add(m[1]);
  for (const u of used) for (const v of [u, u + '/']) if (!have.has(v)) err.push(`redirect mancante in public/_redirects: ${v}`);
  console.log(`verify: ${used.size} link tracciati, tutti con redirect.`);
}
if (err.length) { console.error('\n\x1b[31m✗ verify:\x1b[0m\n  - ' + err.join('\n  - ') + '\n'); process.exit(1); }
console.log(`\x1b[32m✓\x1b[0m verify: ${app.name}, nessun segnaposto.`);
