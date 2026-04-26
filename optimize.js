import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, 'src', 'assets');

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.jpg')) {
      const inputPath = path.join(assetsDir, file);
      const outputFilename = file.replace(/\.(png|jpeg|jpg)$/, '.webp');
      const outputPath = path.join(assetsDir, outputFilename);
      
      console.log(`Processing ${file}...`);
      
      // Use sharp to convert to webp with high compression
      await sharp(inputPath)
        .webp({ quality: 70, effort: 6 }) // 70% quality, max effort for smallest size
        .toFile(outputPath);
        
      console.log(`Created ${outputFilename}`);
      
      // Delete original to save space
      fs.unlinkSync(inputPath);
    }
  }
  console.log('All images optimized to WebP format!');
}

optimizeImages().catch(console.error);
