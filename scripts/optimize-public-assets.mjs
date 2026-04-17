/**
 * Converts raster images under public/assets to minified WebP (sharp).
 * Run: node scripts/optimize-public-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../public/assets");

const RASTER_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const webpOptions = {
  quality: 80,
  effort: 6,
  smartSubsample: true,
};

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

async function main() {
  const all = walk(ROOT);
  const targets = all.filter((f) => RASTER_EXT.has(path.extname(f).toLowerCase()));

  if (targets.length === 0) {
    console.log("No raster images found under", ROOT);
    return;
  }

  for (const filePath of targets) {
    const ext = path.extname(filePath).toLowerCase();
    const base = filePath.slice(0, -ext.length);
    const outPath = `${base}.webp`;

    if (ext === ".webp") {
      const buf = await sharp(filePath).webp(webpOptions).toBuffer();
      fs.writeFileSync(filePath, buf);
      console.log(`Recompressed: ${path.relative(ROOT, filePath)}`);
      continue;
    }

    await sharp(filePath).webp(webpOptions).toFile(outPath);
    fs.unlinkSync(filePath);
    console.log(`Converted: ${path.relative(ROOT, filePath)} -> ${path.basename(outPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
