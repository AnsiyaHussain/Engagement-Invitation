import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateInvitationSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .serif-name {
        font-family: 'Cormorant Garamond', 'Garamond', 'Georgia', 'Times New Roman', serif;
        font-weight: 500;
      }
      .serif-italic {
        font-family: 'Cormorant Garamond', 'Garamond', 'Georgia', 'Times New Roman', serif;
        font-style: italic;
        font-weight: 400;
      }
      .serif-date {
        font-family: 'Cormorant Garamond', 'Garamond', 'Georgia', 'Times New Roman', serif;
        font-weight: 400;
      }
      .sans-sub {
        font-family: 'Jost', 'Century Gothic', 'Segoe UI', -apple-system, sans-serif;
        font-weight: 400;
      }
      .sans-bold {
        font-family: 'Jost', 'Century Gothic', 'Segoe UI', -apple-system, sans-serif;
        font-weight: 600;
      }
    </style>
  </defs>

  <!-- Background Base: Luxury Ivory (#F8F3ED) -->
  <rect width="1200" height="630" fill="#F8F3ED" />

  <!-- Inner Paper Card Panel (#FDFBF7) -->
  <rect x="28" y="28" width="1144" height="574" fill="#FDFBF7" />

  <!-- Outer Hairline Frame (#E6D9C3) -->
  <rect x="44" y="44" width="1112" height="542" fill="none" stroke="#E6D9C3" stroke-width="1.2" />

  <!-- Inner Accent Frame (#A8833F) -->
  <rect x="56" y="56" width="1088" height="518" fill="none" stroke="#A8833F" stroke-width="1.2" stroke-opacity="0.8" />

  <!-- Four Classical Corner Accents (Antique Gold #A8833F) -->
  <!-- Top-Left -->
  <g transform="translate(66, 66)" stroke="#A8833F" stroke-width="1.2" fill="none">
    <path d="M 0,32 L 0,0 L 32,0" />
    <path d="M 7,22 L 7,7 L 22,7" stroke-opacity="0.5" stroke-width="1" />
    <circle cx="12" cy="12" r="1.8" fill="#A8833F" />
  </g>
  <!-- Top-Right -->
  <g transform="translate(1134, 66)" stroke="#A8833F" stroke-width="1.2" fill="none">
    <path d="M 0,32 L 0,0 L -32,0" />
    <path d="M -7,22 L -7,7 L -22,7" stroke-opacity="0.5" stroke-width="1" />
    <circle cx="-12" cy="12" r="1.8" fill="#A8833F" />
  </g>
  <!-- Bottom-Left -->
  <g transform="translate(66, 564)" stroke="#A8833F" stroke-width="1.2" fill="none">
    <path d="M 0,-32 L 0,0 L 32,0" />
    <path d="M 7,-22 L 7,-7 L 22,-7" stroke-opacity="0.5" stroke-width="1" />
    <circle cx="12" cy="-12" r="1.8" fill="#A8833F" />
  </g>
  <!-- Bottom-Right -->
  <g transform="translate(1134, 564)" stroke="#A8833F" stroke-width="1.2" fill="none">
    <path d="M 0,-32 L 0,0 L -32,0" />
    <path d="M -7,-22 L -7,-7 L -22,-7" stroke-opacity="0.5" stroke-width="1" />
    <circle cx="-12" cy="-12" r="1.8" fill="#A8833F" />
  </g>

  <!-- Top Signature Monogram Ring -->
  <g transform="translate(600, 116)">
    <circle cx="0" cy="0" r="44" fill="none" stroke="#E6D9C3" stroke-width="1" />
    <circle cx="0" cy="0" r="40" fill="#FDFBF7" stroke="#A8833F" stroke-width="1.3" />
    <text x="0" y="10" text-anchor="middle" class="serif-name" font-size="26" fill="#4A3730" letter-spacing="1">
      A <tspan fill="#A8833F" class="serif-italic" font-size="24">&amp;</tspan> N
    </text>
  </g>

  <!-- Blessing Subheader -->
  <text x="600" y="196" text-anchor="middle" class="sans-sub" font-size="13" fill="#A8833F" letter-spacing="5.5">
    WITH THE BLESSINGS OF OUR FAMILIES
  </text>

  <!-- Couple Names: Ansiya & Nihal -->
  <text x="600" y="276" text-anchor="middle" class="serif-name" font-size="72" fill="#4A3730" letter-spacing="1.5">
    Ansiya <tspan fill="#A8833F" class="serif-italic" font-size="64" font-weight="300">&amp;</tspan> Nihal
  </text>

  <!-- Central Ornamental Divider Line -->
  <g transform="translate(600, 315)">
    <line x1="-190" y1="0" x2="-32" y2="0" stroke="#E6D9C3" stroke-width="1" />
    <line x1="-90" y1="0" x2="-32" y2="0" stroke="#A8833F" stroke-width="1.3" />
    <!-- Center diamond and pearls motif -->
    <polygon points="0,-7 5.5,0 0,7 -5.5,0" fill="#A8833F" />
    <circle cx="-18" cy="0" r="2" fill="#A8833F" />
    <circle cx="18" cy="0" r="2" fill="#A8833F" />
    <line x1="32" y1="0" x2="90" y2="0" stroke="#A8833F" stroke-width="1.3" />
    <line x1="32" y1="0" x2="190" y2="0" stroke="#E6D9C3" stroke-width="1" />
  </g>

  <!-- Event Title -->
  <text x="600" y="368" text-anchor="middle" class="sans-bold" font-size="24" fill="#A8833F" letter-spacing="8">
    ENGAGEMENT CEREMONY
  </text>

  <!-- Date -->
  <text x="600" y="434" text-anchor="middle" class="serif-date" font-size="25" fill="#4A3730" letter-spacing="2">
    Sunday, 29 November 2026
  </text>

  <!-- Time & Venue -->
  <text x="600" y="474" text-anchor="middle" class="sans-sub" font-size="15" fill="#6A534B" letter-spacing="3.5">
    5:00 PM – 7:00 PM  ·  MANKARA FARMS, THRISSUR
  </text>

  <!-- Islamic Verse / Elegant Closing -->
  <g transform="translate(600, 526)">
    <line x1="-70" y1="0" x2="70" y2="0" stroke="#E6D9C3" stroke-width="0.8" />
  </g>
  <text x="600" y="552" text-anchor="middle" class="serif-italic" font-size="14.5" fill="#A8833F" letter-spacing="1">
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

