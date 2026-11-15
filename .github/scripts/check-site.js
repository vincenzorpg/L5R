/**
 * .github/scripts/check-site.js
 * Vérifications d'hygiène, de cohérence de version et d'intégrité des liens locaux.
 * Aucune dépendance externe requise (Node.js standard uniquement).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const errors = [];

function addError(msg) {
  errors.push(msg);
}

function walkFiles(dir, predicate, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, predicate, results);
    } else if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

// 1. Validation de version.json, CHANGELOG.md et README.md
const versionPath = path.join(ROOT, 'version.json');
let versionData;
try {
  versionData = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
} catch (err) {
  addError(`Impossible de parser version.json : ${err.message}`);
}

if (versionData) {
  const { version, tag, date } = versionData;
  if (!/^\d+\.\d+\.\d+$/.test(version || '')) {
    addError(`version.json : "version" invalide (${version})`);
  }
  if (tag !== `v${version}`) {
    addError(`version.json : "tag" (${tag}) doit correspondre à "v${version}"`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
    addError(`version.json : "date" invalide (${date})`);
  }

  const changelog = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8');
  if (!changelog.includes(`## [${version}]`)) {
    addError(`CHANGELOG.md : section "## [${version}]" manquante`);
  }

  const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
  if (!readme.includes(`Version-v${version}`)) {
    addError(`README.md : badge "Version-v${version}" manquant ou obsolète`);
  }

  // 2. Cohérence des replis statiques #site-version-label
  const versionLabelFiles = [
    ...walkFiles(ROOT, (f) => f.endsWith('.html')),
    path.join(ROOT, 'js', 'campagne-studio.js')
  ];
  const labelRegex = /<span id="site-version-label">(v\d+\.\d+\.\d+)<\/span>/g;

  for (const file of versionLabelFiles) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = labelRegex.exec(content)) !== null) {
      if (match[1] !== `v${version}`) {
        const rel = path.relative(ROOT, file);
        addError(`${rel} : #site-version-label affiche "${match[1]}" au lieu de "v${version}"`);
      }
    }
  }
}

// 3. Vérification des liens et ressources locales dans les fichiers HTML
const htmlFiles = walkFiles(ROOT, (f) => f.endsWith('.html'));
const attrRegex = /\b(?:href|src)=["']([^"']+)["']/gi;
const ignoredSchemes = /^(https?:|mailto:|tel:|data:|javascript:|#)/i;

for (const htmlFile of htmlFiles) {
  // Ignore les scripts inline en retirant le contenu des balises <script>...</script>
  const rawHtml = fs.readFileSync(htmlFile, 'utf8');
  const htmlWithoutScripts = rawHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const dir = path.dirname(htmlFile);
  const relHtml = path.relative(ROOT, htmlFile);

  let match;
  while ((match = attrRegex.exec(htmlWithoutScripts)) !== null) {
    const target = match[1].trim();
    if (!target || ignoredSchemes.test(target) || target.includes('${')) continue;

    // Retire la query string ou le fragment d'ancre (#section, ?v=1)
    const cleanTarget = target.split('#')[0].split('?')[0];
    if (!cleanTarget) continue;

    const resolved = cleanTarget.startsWith('/')
      ? path.join(ROOT, cleanTarget.slice(1))
      : path.resolve(dir, cleanTarget);

    if (!fs.existsSync(resolved)) {
      addError(`${relHtml} : ressource locale introuvable -> "${target}"`);
    }
  }
}

if (errors.length > 0) {
  console.error('❌ Échec des vérifications d\'hygiène du site :\n');
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(`✅ Hygiène du site validée (${htmlFiles.length} fichiers HTML vérifiés, version v${versionData.version}).`);
