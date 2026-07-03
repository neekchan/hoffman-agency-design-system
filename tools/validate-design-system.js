#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const errors = [];

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function walk(dir, results = []) {
  if (!exists(dir)) return results;

  for (const entry of fs.readdirSync(fromRoot(dir), { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;

    const relPath = toPosix(path.join(dir, entry.name));
    if (entry.isDirectory()) {
      walk(relPath, results);
    } else {
      results.push(relPath);
    }
  }

  return results;
}

function parseAttributes(source) {
  const attrs = {};
  const attrPattern = /([A-Za-z0-9_-]+)="([^"]*)"/g;
  let match;

  while ((match = attrPattern.exec(source))) {
    attrs[match[1]] = match[2];
  }

  return attrs;
}

function findMarkers(markerName, dirs) {
  const markerPattern = new RegExp(`<!--\\s*@${markerName}\\s+([\\s\\S]*?)-->`, 'g');
  const markers = [];

  for (const dir of dirs) {
    for (const filePath of walk(dir)) {
      if (!filePath.endsWith('.html')) continue;

      const source = read(filePath);
      let match;
      while ((match = markerPattern.exec(source))) {
        markers.push({
          path: filePath,
          attrs: parseAttributes(match[1]),
        });
      }
    }
  }

  return markers;
}

function count(pattern, source) {
  return (source.match(pattern) || []).length;
}

function validateManifest(manifest) {
  if (!Array.isArray(manifest.components)) fail('_ds_manifest.json: components must be an array');
  if (!Array.isArray(manifest.cards)) fail('_ds_manifest.json: cards must be an array');
  if (!Array.isArray(manifest.templates)) fail('_ds_manifest.json: templates must be an array');

  for (const cssPath of manifest.globalCssPaths || []) {
    if (!exists(cssPath)) fail(`Manifest globalCssPaths entry does not exist: ${cssPath}`);
  }

  const bundle = exists('_ds_bundle.js') ? read('_ds_bundle.js') : '';
  if (!bundle) fail('Missing _ds_bundle.js');

  for (const component of manifest.components || []) {
    if (!component.name) fail('Manifest component is missing a name');
    if (!component.sourcePath) fail(`Manifest component ${component.name || '<unknown>'} is missing sourcePath`);
    if (!component.sourcePath || !exists(component.sourcePath)) {
      fail(`Manifest component sourcePath does not exist: ${component.sourcePath}`);
      continue;
    }

    const source = read(component.sourcePath);
    const exportPattern = new RegExp(`export\\s+function\\s+${escapeRegExp(component.name)}\\b`);
    if (!exportPattern.test(source)) {
      fail(`${component.sourcePath}: missing export function ${component.name}`);
    }

    const bundlePattern = new RegExp(`__ds_ns\\.${escapeRegExp(component.name)}\\s*=`);
    if (!bundlePattern.test(bundle)) {
      fail(`_ds_bundle.js: missing namespace export for ${component.name}`);
    }
  }
}

function validateCards(manifest) {
  const sourceCards = findMarkers('dsCard', ['preview', 'slides', 'ui_kits']);
  const sourceByPath = new Map();

  for (const card of sourceCards) {
    if (sourceByPath.has(card.path)) fail(`Duplicate @dsCard marker in ${card.path}`);
    sourceByPath.set(card.path, card);

    for (const key of ['group', 'name', 'subtitle', 'viewport']) {
      if (!card.attrs[key]) fail(`${card.path}: @dsCard missing ${key}`);
    }
  }

  const manifestByPath = new Map();
  for (const card of manifest.cards || []) {
    if (!card.path) {
      fail('Manifest card is missing path');
      continue;
    }

    if (manifestByPath.has(card.path)) fail(`Duplicate manifest card path: ${card.path}`);
    manifestByPath.set(card.path, card);

    if (!exists(card.path)) fail(`Manifest card path does not exist: ${card.path}`);
    const sourceCard = sourceByPath.get(card.path);
    if (!sourceCard) {
      fail(`Manifest card has no matching @dsCard marker: ${card.path}`);
      continue;
    }

    for (const key of ['group', 'name', 'subtitle', 'viewport']) {
      if (card[key] !== sourceCard.attrs[key]) {
        fail(`${card.path}: manifest ${key} is stale. Expected "${sourceCard.attrs[key]}", found "${card[key]}"`);
      }
    }
  }

  for (const card of sourceCards) {
    if (!manifestByPath.has(card.path)) {
      fail(`${card.path}: @dsCard marker is missing from _ds_manifest.json`);
    }
  }
}

function validateTemplates(manifest) {
  const sourceTemplates = findMarkers('template', ['templates']);
  const sourceByPath = new Map(sourceTemplates.map((template) => [template.path, template]));
  const manifestByPath = new Map();

  for (const template of manifest.templates || []) {
    if (!template.entryPath) {
      fail(`Manifest template ${template.name || '<unknown>'} is missing entryPath`);
      continue;
    }

    if (manifestByPath.has(template.entryPath)) fail(`Duplicate manifest template entryPath: ${template.entryPath}`);
    manifestByPath.set(template.entryPath, template);

    if (!exists(template.entryPath)) {
      fail(`Manifest template entryPath does not exist: ${template.entryPath}`);
      continue;
    }

    if (template.folder && !exists(template.folder)) {
      fail(`Manifest template folder does not exist: ${template.folder}`);
    }

    const sourceTemplate = sourceByPath.get(template.entryPath);
    if (!sourceTemplate) {
      fail(`Manifest template has no matching @template marker: ${template.entryPath}`);
      continue;
    }

    if (template.name !== sourceTemplate.attrs.name) {
      fail(`${template.entryPath}: manifest template name is stale. Expected "${sourceTemplate.attrs.name}", found "${template.name}"`);
    }
  }

  for (const template of sourceTemplates) {
    if (!manifestByPath.has(template.path)) {
      fail(`${template.path}: @template marker is missing from _ds_manifest.json`);
    }
  }
}

function validateUiKitReadme(folder) {
  const filePath = `${folder}/README.md`;
  const source = read(filePath);
  const codePattern = /`([^`]+\.(?:jsx|html))`/g;
  let match;

  while ((match = codePattern.exec(source))) {
    const referenced = `${folder}/${match[1]}`;
    if (!exists(referenced)) fail(`${filePath}: referenced file does not exist: ${match[1]}`);
  }
}

function validateDeckTemplate() {
  const filePath = 'templates/deck/Deck.dc.html';
  const source = read(filePath);
  const layoutCount = count(/@layout code=/g, source);
  const sectionCount = count(/<section\b/g, source);

  if (layoutCount !== 48) fail(`${filePath}: expected 48 @layout entries, found ${layoutCount}`);
  if (sectionCount !== 48) fail(`${filePath}: expected 48 slide sections, found ${sectionCount}`);
  if (layoutCount !== sectionCount) fail(`${filePath}: @layout count (${layoutCount}) does not match section count (${sectionCount})`);
}

function validateGuidelinesDeck() {
  const filePath = 'slides/Hoffman Brand Guidelines.html';
  const source = read(filePath);
  const sectionCount = count(/<section\b/g, source);
  const card = findMarkers('dsCard', ['slides']).find((marker) => marker.path === filePath);

  if (!card) {
    fail(`${filePath}: missing @dsCard marker`);
    return;
  }

  const slideCountMatch = /^(\d+)\s+slides\b/.exec(card.attrs.subtitle || '');
  if (!slideCountMatch) {
    fail(`${filePath}: @dsCard subtitle must start with the slide count`);
    return;
  }

  const advertisedCount = Number(slideCountMatch[1]);
  if (advertisedCount !== sectionCount) {
    fail(`${filePath}: @dsCard advertises ${advertisedCount} slides, but markup contains ${sectionCount}`);
  }
}

function main() {
  let manifest;
  try {
    manifest = JSON.parse(read('_ds_manifest.json'));
  } catch (error) {
    fail(`Could not parse _ds_manifest.json: ${error.message}`);
    manifest = {};
  }

  validateManifest(manifest);
  validateCards(manifest);
  validateTemplates(manifest);
  validateUiKitReadme('ui_kits/website');
  validateUiKitReadme('ui_kits/app');
  validateDeckTemplate();
  validateGuidelinesDeck();

  if (errors.length) {
    console.error('Design-system validation failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log('Design-system validation passed.');
  console.log(`Checked ${(manifest.components || []).length} components, ${(manifest.cards || []).length} cards, and ${(manifest.templates || []).length} templates.`);
}

main();
