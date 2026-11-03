import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to generate soft curved rose petal SVG path
function petalPath(x, y, scale, angle, fill, opacity) {
  const s = scale;
  return `<g transform="translate(${x}, ${y}) rotate(${angle}) scale(1, 0.65)" opacity="${opacity}">
    <path d="M 0,${-s} C ${s * 0.95},${-s * 0.55} ${s * 0.8},${s * 0.75} 0,${s} C ${-s * 0.8},${s * 0.75} ${-s * 0.95},${-s * 0.55} 0,${-s} Z" fill="${fill}" />
    <path d="M 0,${-s * 0.7} L 0,${s * 0.6}" stroke="rgba(255,255,255,0.45)" stroke-width="1.2" />
  </g>`;
}

// Background petals scattered naturally around the margins (dreamy flower shower)
const petals = [
  petalPath(110, 95, 18, -25, '#F4B5C4', 0.55),
  petalPath(160, 140, 14, 40, '#E8809A', 0.45),
  petalPath(95, 220, 16, 15, '#F9D3DB', 0.5),
  petalPath(1080, 110, 19, 35, '#F4B5C4', 0.55),
  petalPath(1040, 170, 13, -20, '#E9C27A', 0.4),
  petalPath(1110, 240, 16, -45, '#E8809A', 0.45),
  petalPath(130, 490, 17, 30, '#F4B5C4', 0.5),
  petalPath(80, 540, 14, -15, '#E9C27A', 0.4),
  petalPath(1060, 480, 18, -35, '#F4B5C4', 0.55),
  petalPath(1120, 530, 15, 20, '#E8809A', 0.45),
  petalPath(320, 70, 12, 10, '#F9D3DB', 0.35),
  petalPath(880, 80, 13, -15, '#F4B5C4', 0.35),
].join('\n');

export function generateInvitationSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF8F1" />
      <stop offset="55%" stop-color="#FDEBE6" />
      <stop offset="100%" stop-color="#FBE3D8" />
    </linearGradient>
    <radialGradient id="blushTopRight" cx="88%" cy="5%" r="65%">
      <stop offset="0%" stop-color="#F4AAB9" stop-opacity="0.45" />
      <stop offset="65%" stop-color="#FFF8F1" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="goldBottomLeft" cx="8%" cy="95%" r="60%">
      <stop offset="0%" stop-color="#E9C27A" stop-opacity="0.35" />
      <stop offset="65%" stop-color="#FFF8F1" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="blushBottomRight" cx="92%" cy="95%" r="55%">
      <stop offset="0%" stop-color="#F4AAB9" stop-opacity="0.3" />
      <stop offset="65%" stop-color="#FFF8F1" stop-opacity="0" />
    </radialGradient>
    <style>
      .serif-title { font-family: 'Cormorant Garamond', 'Garamond', 'Georgia', serif; font-weight: 500; }
      .serif-italic { font-family: 'Cormorant Garamond', 'Garamond', 'Georgia', serif; font-style: italic; }
      .sans-sub { font-family: 'Jost', 'Century Gothic', 'Segoe UI', sans-serif; }
      .arabic-txt { font-family: 'Amiri', 'Traditional Arabic', serif; }
    </style>
  </defs>

  <!-- Background Base Gradients: Dreamy Blush Pink & Warm Ivory -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#blushTopRight)" />
  <rect width="1200" height="630" fill="url(#goldBottomLeft)" />
  <rect width="1200" height="630" fill="url(#blushBottomRight)" />

  <!-- Floating Romantic Rose Petals -->
  ${petals}

  <!-- Fixed Outer Champagne-Gold Frame (matches website .frame) -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#C49A50" stroke-width="1.3" stroke-opacity="0.85" />
  <rect x="27" y="27" width="1146" height="576" fill="none" stroke="#C49A50" stroke-width="0.8" stroke-opacity="0.35" />

  <!-- Diamond Corner Accents -->
  <polygon points="20,12 28,20 20,28 12,20" fill="#C49A50" />
  <polygon points="1180,12 1188,20 1180,28 1172,20" fill="#C49A50" />
  <polygon points="20,602 28,610 20,618 12,610" fill="#C49A50" />
  <polygon points="1180,602 1188,610 1180,618 1172,610" fill="#C49A50" />

  <!-- Top Arabic Bismillah -->
  <text x="600" y="98" text-anchor="middle" class="arabic-txt" font-size="34" fill="#7A1F3D">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</text>
  
  <!-- English Meaning -->
  <text x="600" y="132" text-anchor="middle" class="sans-sub" font-size="10.5" font-weight="400" fill="#C49A50" letter-spacing="4">
    IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL
  </text>

  <!-- Subtle Gold Hairline Divider -->
  <line x1="560" y1="154" x2="640" y2="154" stroke="#C49A50" stroke-width="1" stroke-opacity="0.6" />

  <!-- Blessing Subtitle -->
  <text x="600" y="184" text-anchor="middle" class="sans-sub" font-size="12.5" font-weight="400" fill="#C49A50" letter-spacing="5">
    WITH THE BLESSINGS OF OUR FAMILIES
  </text>

  <!-- Central Names + Interlocking Wedding Rings Layout -->
  <g transform="translate(600, 275)">
    <!-- Bride Name: Ansiya -->
    <text x="-95" y="18" text-anchor="end" class="serif-title" font-size="74" fill="#7A1F3D" letter-spacing="1">
      Ansiya
    </text>

    <!-- Center: Two Interlocking Champagne Gold Wedding Rings with Solitaire Diamond -->
    <g transform="translate(0, -6) scale(0.16) translate(-256, -260)" fill="none" stroke="#C49A50" stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
      <!-- Diamond Gemstone on Top of Right Ring -->
      <polygon points="336,36 410,36 434,80 397,120 335,120 312,80" />
      <!-- Left Plain Ring with Gap at Top Intersection -->
      <path d="M 278.8 201.4 A 160 160 0 1 1 220.1 170.2" />
      <!-- Right Diamond Ring with Gap at Bottom Intersection -->
      <path d="M 299.5 358.4 A 131 131 0 1 1 360.4 375.9" />
    </g>

    <!-- Groom Name: Nihal -->
    <text x="95" y="18" text-anchor="start" class="serif-title" font-size="74" fill="#7A1F3D" letter-spacing="1">
      Nihal
    </text>
  </g>

  <!-- Ornamental Central Divider Rule -->
  <g transform="translate(600, 335)">
    <line x1="-180" y1="0" x2="-26" y2="0" stroke="#C49A50" stroke-width="1" stroke-opacity="0.6" />
    <polygon points="0,-5 4.5,0 0,5 -4.5,0" fill="#C49A50" />
    <circle cx="-14" cy="0" r="1.8" fill="#C49A50" />
    <circle cx="14" cy="0" r="1.8" fill="#C49A50" />
    <line x1="26" y1="0" x2="180" y2="0" stroke="#C49A50" stroke-width="1" stroke-opacity="0.6" />
  </g>

  <!-- Subtitle: ENGAGEMENT CEREMONY -->
  <text x="600" y="380" text-anchor="middle" class="sans-sub" font-size="21" font-weight="500" fill="#C49A50" letter-spacing="8">
    ENGAGEMENT CEREMONY
  </text>

  <!-- Ceremony Date -->
  <text x="600" y="434" text-anchor="middle" class="serif-title" font-size="25" fill="#7A1F3D" letter-spacing="2">
    Sunday, 29 November 2026
  </text>

  <!-- Time & Venue -->
  <text x="600" y="474" text-anchor="middle" class="sans-sub" font-size="15" font-weight="400" fill="#73535A" letter-spacing="3.5">
    5:00 PM – 7:00 PM  ·  MANKARA FARMS, THRISSUR
  </text>

  <!-- Bottom Divider & Quranic Arabic Verse + Meaning -->
  <line x1="530" y1="516" x2="670" y2="516" stroke="#C49A50" stroke-width="0.8" stroke-opacity="0.5" />
  
  <text x="600" y="552" text-anchor="middle" class="arabic-txt" font-size="23" fill="#7A1F3D">وَخَلَقْنَاكُمْ أَزْوَاجًا</text>
  <text x="600" y="582" text-anchor="middle" class="serif-italic" font-size="14.5" fill="#C49A50" letter-spacing="1">
    “And We created you in pairs”  ·  Surah An-Naba 78:8
  </text>

</svg>`;
}

async function run() {
  const svg = generateInvitationSvg();
  const outputPath = path.resolve(__dirname, '../public/whatsapp-invitation.jpg');

  await sharp(Buffer.from(svg))
    .jpeg({
      quality: 92,
      chromaSubsampling: '4:4:4',
      mozjpeg: true,
    })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`Successfully generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
}

run().catch((err) => {
  console.error('Error generating preview:', err);
  process.exit(1);
});
