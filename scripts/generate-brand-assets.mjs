import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const favicon = await readFile(new URL('../public/favicon.svg', import.meta.url));
await sharp(favicon).resize(32, 32).png().toFile(new URL('../public/favicon-32.png', import.meta.url).pathname);
await sharp(favicon).resize(180, 180).png().toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);
await sharp(new URL('../public/images/social-preview.svg', import.meta.url).pathname).png().toFile(new URL('../public/images/social-preview.png', import.meta.url).pathname);

for (const name of ['cka', 'capa', 'otca', 'pca']) {
  const file = new URL(`../public/images/badges/${name}.png`, import.meta.url);
  const image = await readFile(file);
  const optimized = await sharp(image).resize(256, 256, { fit: 'inside', withoutEnlargement: true }).png({ compressionLevel: 9 }).toBuffer();
  const { writeFile } = await import('node:fs/promises');
  await writeFile(file, optimized);
}
console.log('Generated brand assets and optimized credential artwork.');
