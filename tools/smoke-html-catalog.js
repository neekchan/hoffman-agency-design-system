#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const errors = [];

function fromRoot(filePath) {
  return path.join(root, filePath);
}

function exists(filePath) {
  return fs.existsSync(fromRoot(filePath));
}

function read(filePath) {
  return fs.readFileSync(fromRoot(filePath), 'utf8');
}

function fail(message) {
  errors.push(message);
}

function isExternal(value) {
  return /^(?:https?:|data:|mailto:|tel:|#|javascript:)/i.test(value);
}

function normalizeLocalRef(filePath, value) {
  const clean = value.split('#')[0].split('?')[0];
  if (!clean || isExternal(clean)) return null;
  return path.posix.normalize(path.posix.join(path.posix.dirname(filePath), clean));
}

function validateLocalRefs(filePath) {
  const source = read(filePath);
  const attrPattern = /\b(?:src|href)=["']([^"']+)["']/g;
  let match;

  while ((match = attrPattern.exec(source))) {
    const ref = normalizeLocalRef(filePath, match[1]);
    if (!ref) continue;
    if (!exists(ref)) fail(`${filePath}: local reference does not exist: ${match[1]} -> ${ref}`);
  }
}

function validateDemo(filePath) {
  const source = read(filePath);
  if (!source.includes('<div id="root"')) fail(`${filePath}: missing React root`);
  if (!source.includes('_ds_bundle.js')) fail(`${filePath}: does not load _ds_bundle.js`);
  if (!source.includes('ReactDOM.createRoot')) fail(`${filePath}: missing ReactDOM.createRoot render`);
}

function main() {
  let manifest;
  try {
    manifest = JSON.parse(read('_ds_manifest.json'));
  } catch (error) {
    fail(`Could not parse _ds_manifest.json: ${error.message}`);
    manifest = {};
  }

  for (const docPath of ['LLM_ENTRYPOINT.md', 'ANTI_PATTERNS.md', 'ui_kits/app/COMPONENTS.md']) {
    if (!exists(docPath)) fail(`Required LLM guidance file is missing: ${docPath}`);
  }

  for (const card of manifest.cards || []) {
    if (!card.path || !card.path.endsWith('.html')) continue;
    if (!exists(card.path)) {
      fail(`Manifest card path does not exist: ${card.path}`);
      continue;
    }
    validateLocalRefs(card.path);
  }

  for (const filePath of ['ui_kits/website/index.html', 'ui_kits/app/index.html']) {
    if (!exists(filePath)) {
      fail(`UI kit demo is missing: ${filePath}`);
      continue;
    }
    validateDemo(filePath);
  }

  const bundle = exists('_ds_bundle.js') ? read('_ds_bundle.js') : '';
  for (const component of manifest.components || []) {
    if (!component.name) continue;
    const exportPattern = new RegExp(`__ds_ns\\.${component.name}\\s*=`);
    if (!exportPattern.test(bundle)) fail(`_ds_bundle.js: missing namespace assignment for ${component.name}`);
  }

  if (errors.length) {
    console.error('HTML catalog smoke check failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log('HTML catalog smoke check passed.');
  console.log(`Checked ${(manifest.cards || []).length} cards and ${(manifest.components || []).length} component exports.`);
}

main();
