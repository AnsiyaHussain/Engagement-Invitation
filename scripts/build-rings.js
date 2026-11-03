import fs from 'fs';
import sharp from 'sharp';

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = angleDeg * Math.PI / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  let diff = endAngle - startAngle;
  while (diff < 0) diff += 360;
  const largeArcFlag = diff <= 180 ? '0' : '1';
  return ['M', start.x.toFixed(1), start.y.toFixed(1), 'A', r, r, 0, largeArcFlag, 1, end.x.toFixed(1), end.y.toFixed(1)].join(' ');
}

// Right ring: center (365, 245), r=131
// Lower intersection is around 106 deg. Gap between 93 deg and 119 deg.
const rightRingArc = describeArc(365, 245, 131, 120, 92);

// Left ring: center (176, 324), r=160
// Upper intersection is around -62.4 deg. Gap between -74 deg and -50 deg.
const leftRingArc = describeArc(176, 324, 160, -50, -74);

export function generateRingsSVG(color = 'currentColor', strokeWidth = 18) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
  <!-- Diamond Gemstone on Top of Right Ring -->
  <polygon points="336,36 410,36 434,80 397,120 335,120 312,80" />
  <!-- Left Plain Ring with Gap at Top Intersection -->
  <path d="${leftRingArc}" />
  <!-- Right Diamond Ring with Gap at Bottom Intersection -->
  <path d="${rightRingArc}" />
</svg>`;
}

async function main() {
  fs.writeFileSync('public/rings.svg', generateRingsSVG('currentColor', 18));
  
  // Render high-res gold rings for hero
  const svgGold = generateRingsSVG('#B8893F', 18);
  await sharp(Buffer.from(svgGold))
    .resize(512, 512)
    .png()
    .toFile('public/rings.png');

  // Render 64px version
  await sharp(Buffer.from(svgGold))
    .resize(64, 64)
    .png()
    .toFile('public/rings-64.png');

  // Render monogram seal gold (#E5C27A)
  const svgSeal = generateRingsSVG('#E5C27A', 20);
  await sharp(Buffer.from(svgSeal))
    .resize(512, 512)
    .png()
    .toFile('public/images/rings-seal-gold.png');

  console.log('Successfully generated public/rings.svg, public/rings.png, public/rings-64.png, and public/images/rings-seal-gold.png!');
}

main().catch(console.error);
