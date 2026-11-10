import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SVG_PATH = path.resolve('public/favicon.svg');
const PUBLIC_DIR = path.resolve('public');

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(SVG_PATH);

  // Generate PNGs at various sizes
  const sizes = [16, 32, 48, 96, 180, 192, 512];
  const pngBuffers: { [size: number]: Buffer } = {};

  for (const size of sizes) {
    const pngBuf = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers[size] = pngBuf;

    if (size === 180) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), pngBuf);
    } else {
      fs.writeFileSync(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`), pngBuf);
    }
  }

  // Also create standard root favicon.png (48x48 for Google Search)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.png'), pngBuffers[48]);

  // Construct standard multi-image ICO containing 16x16, 32x32, 48x48 PNGs
  const icoSizes = [16, 32, 48];
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
  icoHeader.writeUInt16LE(icoSizes.length, 4); // Number of images

  let offset = 6 + (16 * icoSizes.length);
  const dirEntries: Buffer[] = [];
  const payloads: Buffer[] = [];

  for (const size of icoSizes) {
    const imgBuf = pngBuffers[size];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // Width
    entry.writeUInt8(size, 1); // Height
    entry.writeUInt8(0, 2);    // Palette colors (0 = no palette)
    entry.writeUInt8(0, 3);    // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(imgBuf.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset of image data
    dirEntries.push(entry);
    payloads.push(imgBuf);
    offset += imgBuf.length;
  }

  const icoBuffer = Buffer.concat([icoHeader, ...dirEntries, ...payloads]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);

  console.log('Successfully generated favicon.ico, PNG favicons (16, 32, 48, 96, 180, 192, 512), and apple-touch-icon!');
}

generateFavicons().catch((err) => {
  console.warn('Notice: Favicon generator skipped (existing favicons in public/ will be used):', err.message);
});
