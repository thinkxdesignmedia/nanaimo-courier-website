#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const publicDir = path.join(__dirname, '../public');
const svgPath = path.join(publicDir, 'favicon.svg');

// Icon sizes to generate
const sizes = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192.png', size: 192 },
  { name: 'android-chrome-512.png', size: 512 },
];

async function generateIcons() {
  console.log('Generating icon set from favicon.svg...');

  try {
    // Generate PNG icons
    for (const icon of sizes) {
      const outputPath = path.join(publicDir, icon.name);
      await sharp(svgPath)
        .resize(icon.size, icon.size)
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${icon.name}`);
    }

    // Generate favicon.ico (use 32px as source)
    const icoPath = path.join(publicDir, 'favicon.ico');
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(icoPath);
    console.log('✓ Generated favicon.ico');

    // Generate site.webmanifest
    const manifest = {
      name: 'Nanaimo Courier',
      short_name: 'NC Courier',
      description: 'Same-day courier service in Nanaimo, BC',
      start_url: '/',
      display: 'standalone',
      theme_color: '#2a1ad4',
      background_color: '#141414',
      icons: [
        {
          src: '/android-chrome-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/android-chrome-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
      ],
    };

    fs.writeFileSync(
      path.join(publicDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('✓ Generated site.webmanifest');

    console.log('\n✅ Icon generation complete!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
