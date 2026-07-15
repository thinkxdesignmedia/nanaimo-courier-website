#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const allPages = [];
const links = new Set();
const errors = [];

function crawlDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      crawlDir(fullPath);
    } else if (file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const pagePath = fullPath.replace(distDir, '').replace(/\\/g, '/');
      allPages.push(pagePath);

      // Extract href and src links
      const hrefMatches = content.match(/href=['"]([^'"]+)['"]/g) || [];
      const srcMatches = content.match(/src=['"]([^'"]+)['"]/g) || [];

      [...hrefMatches, ...srcMatches].forEach((match) => {
        const url = match.split('=')[1].replace(/['"]]/g, '');
        if (url && !url.startsWith('http') && !url.startsWith('//')) {
          links.add(url);
        }
      });
    }
  });
}

crawlDir(distDir);

// Check if internal links resolve
links.forEach((link) => {
  if (link.startsWith('/')) {
    let checkPath = link;
    if (link.endsWith('/')) checkPath += 'index.html';
    else if (!link.includes('.')) checkPath += '/index.html';

    const fullPath = path.join(distDir, checkPath);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Broken internal link: ${link} (checked: ${checkPath})`);
    }
  }
});

console.log(`✓ Total HTML pages: ${allPages.length}`);
console.log(`✓ Total unique links checked: ${links.size}`);
if (errors.length > 0) {
  console.log(`❌ Broken links found:`);
  errors.forEach((e) => console.log(`  - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ No internal broken links detected`);
}
