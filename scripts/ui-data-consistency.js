/* CONTENT ACCURACY & SOURCE OF TRUTH – automated UI↔data consistency test.
   Reads the single source of truth (src/data/menu.ts) and verifies that the
   important business data rendered on / and /menu matches it exactly.
   Read-only: starts no server, changes no files. Requires a running server
   at BASE (default http://127.0.0.1:3000).
*/
const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE = process.env.UI_TEST_BASE || 'http://127.0.0.1:3000';
const SRC = fs.readFileSync(path.join(ROOT, 'src/data/menu.ts'), 'utf8');

let failures = 0;
function check(label, ok, detail = '') {
  console.log((ok ? 'OK   ' : 'FAIL ') + label + (detail ? '  [' + detail + ']' : ''));
  if (!ok) failures++;
}

// --- Parse the single source of truth (no hardcoded business values) ---
function block(from, to) {
  const a = SRC.indexOf(from);
  const b = to ? SRC.indexOf(to, a) : SRC.length;
  return SRC.slice(a, b);
}
const pizzaBlock = block('export const PIZZAS', 'export const PRILOHY');
const prilBlock = block('export const PRILOHY', 'export const FAVORITE_IDS');
const favBlock = block('export const FAVORITE_IDS', 'export function formatPrice');
const contactBlock = block('export const CONTACT', null);

const pizzas = [...pizzaBlock.matchAll(/name:\s*"([^"]+)",\s*grams:\s*(\d+),\s*price:\s*([\d.]+),\s*category:\s*"[^"]+",\s*description:\s*"([^"]*)"/g)].map((m) => ({ name: m[1], grams: +m[2], price: +m[3], description: m[4] }));
const prilohy = [...prilBlock.matchAll(/name:\s*"([^"]+)",\s*price:\s*([\d.]+)/g)].map((m) => ({ name: m[1], price: +m[2] }));
const favoriteIds = (favBlock.match(/"([a-z0-9-]+)"/g) || []).map((s) => s.slice(1, -1));
const grab = (key) => (contactBlock.match(new RegExp(key + ':\\s*"([^"]*)"')) || [])[1];
const contact = {
  name: grab('name'), address: grab('address'), city: grab('city'),
  phone: grab('phone'), phoneHref: grab('phoneHref'), web: grab('web'),
};
const euro = (v) => v.toFixed(2).replace('.', ',');

check('source: 13 pizzas parsed', pizzas.length === 13, String(pizzas.length));
check('source: 9 prilohy parsed', prilohy.length === 9, String(prilohy.length));
check('source: 3 favorite ids parsed', favoriteIds.length === 3, favoriteIds.join(','));

function get(page) {
  return new Promise((resolve) => {
    const req = http.get(BASE + page, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', (e) => resolve({ status: 0, body: '', error: e.message }));
    req.setTimeout(10000, () => req.destroy(new Error('timeout')));
  });
}
const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '');

(async () => {
  for (const page of ['/', '/menu']) {
    const r = await get(page);
    const label = page + ' :: ';
    if (r.status !== 200) {
      check(label + 'HTTP 200', false, 'status=' + r.status + (r.error ? ' ' + r.error : ''));
      continue;
    }
    check(label + 'HTTP 200', true);
    const html = stripComments(r.body);
    const has = (s) => html.includes(s);

    const missingNames = pizzas.filter((p) => !has(p.name)).map((p) => p.name);
    const missingGrams = pizzas.filter((p) => !has(p.grams + ' g')).map((p) => p.name);
    const missingPrices = pizzas.filter((p) => !has(euro(p.price))).map((p) => p.name);
    const missingDescs = pizzas.filter((p) => !has(p.description)).map((p) => p.name);
    check(label + 'Správnosť názvov: OK', missingNames.length === 0, missingNames.join(', '));
    check(label + 'Správnosť parametrov (gramáže): OK', missingGrams.length === 0, missingGrams.join(', '));
    check(label + 'Správnosť cien (pizze): OK', missingPrices.length === 0, missingPrices.join(', '));
    check(label + 'Správnosť popisov: OK', missingDescs.length === 0, missingDescs.join(', '));

    const missingPrilNames = prilohy.filter((p) => !has(p.name)).map((p) => p.name);
    const missingPrilPrices = prilohy.filter((p) => !has(euro(p.price))).map((p) => p.name);
    check(label + 'Správnosť názvov (prílohy): OK', missingPrilNames.length === 0, missingPrilNames.join(', '));
    check(label + 'Správnosť cien (prílohy): OK', missingPrilPrices.length === 0, missingPrilPrices.join(', '));

    for (const key of ['name', 'address', 'city', 'phone', 'phoneHref', 'web']) {
      check(label + 'Správnosť kontaktov (' + key + '): OK', !!contact[key] && has(contact[key]), String(contact[key]));
    }
    check(label + 'Kategórie filtra prítomné', ['Všetky', 'Klasické', 'Mäsové', 'Pikantné', 'Syrové'].every(has));
    check(label + 'aria-live + aria-pressed prítomné', has('aria-live="polite"') && (html.match(/aria-pressed=/g) || []).length >= 5);
  }

  // Favorite cards exist only on homepage; verify their ids resolve to source pizzas.
  const home = stripComments((await get('/')).body);
  const favPizzas = favoriteIds.map((id) => pizzas.find((p) => SRC.includes('id: "' + id + '"')));
  const favOk = favPizzas.every((p) => p && home.includes(p.name));
  check('Favoriti: zobrazujú sa iba pizzá z centrálneho zdroja', favOk, favoriteIds.join(','));

  console.log('\n' + (failures === 0 ? 'ALL CONTENT CONSISTENCY CHECKS PASSED' : failures + ' CHECK(S) FAILED'));
  process.exit(failures === 0 ? 0 : 1);
})().catch((e) => { console.error('FATAL ' + e.stack); process.exit(2); });
