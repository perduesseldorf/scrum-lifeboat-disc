/**
 * Renders public/og-card.svg → public/og-card.png for WhatsApp / Open Graph.
 * Run after editing the SVG: node scripts/render-social.mjs
 */
import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pub = path.join(root, "public");

// 600x315 is enough for OG previews and keeps the PNG small (not a favicon — see favicon.svg).
const ogSvg = readFileSync(path.join(pub, "og-card.svg"));
await sharp(ogSvg)
  .resize(600, 315)
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(path.join(pub, "og-card.png"));
console.log("Wrote", path.join(pub, "og-card.png"));

const favSvg = readFileSync(path.join(pub, "favicon.svg"));
await sharp(favSvg).resize(180, 180).png().toFile(path.join(pub, "apple-touch-icon.png"));
console.log("Wrote", path.join(pub, "apple-touch-icon.png"));
