/**
 * Soft watercolor floral decorations (pure SVG, no image files needed).
 * Purely decorative: every element is aria-hidden and ignores pointer events.
 */

const C = {
  blush: '#F2B8C0',
  rose: '#E6949F',
  peach: '#F7CDB8',
  lilac: '#CFC0E0',
  cream: '#FFF3E6',
  sage: '#9DB89B',
  sageDeep: '#7E9E81',
  heart: '#E9B96E',
};

function WatercolorDefs({ id }) {
  return (
    <defs>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="5" result="d" />
        <feGaussianBlur in="d" stdDeviation="0.7" />
      </filter>
    </defs>
  );
}

function Blossom({ x, y, r = 22, n = 5, fill, rot = 0, op = 0.85, center = C.heart }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={op}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy={-r * 0.55}
          rx={r * 0.42}
          ry={r * 0.62}
          fill={fill}
          transform={`rotate(${(i * 360) / n})`}
        />
      ))}
      <circle r={r * 0.24} fill={center} opacity="0.9" />
      <circle r={r * 0.1} fill="#fff" opacity="0.55" />
    </g>
  );
}

function Leaf({ x, y, len = 40, rot = 0, fill = C.sage, op = 0.85 }) {
  const d = `M0 0 C ${len * 0.3} ${-len * 0.34}, ${len * 0.78} ${-len * 0.3}, ${len} 0 C ${len * 0.78} ${len * 0.3}, ${len * 0.3} ${len * 0.34}, 0 0 Z`;
  return <path d={d} fill={fill} opacity={op} transform={`translate(${x} ${y}) rotate(${rot})`} />;
}

/** Large corner cluster. Flip with CSS for the other corners. */
export function FloralCorner({ className = '', style }) {
  return (
    <svg
      className={`floral-corner ${className}`}
      style={style}
      viewBox="0 0 260 260"
      aria-hidden="true"
      focusable="false"
    >
      <WatercolorDefs id="wc-corner" />
      <g filter="url(#wc-corner)">
        {/* stems */}
        <path d="M-5 150 C 40 140, 80 100, 120 40" stroke={C.sageDeep} strokeWidth="2.2" fill="none" opacity="0.75" />
        <path d="M30 -5 C 50 50, 100 85, 170 100" stroke={C.sageDeep} strokeWidth="2" fill="none" opacity="0.7" />
        {/* leaves */}
        <Leaf x={34} y={140} len={46} rot={-35} />
        <Leaf x={62} y={118} len={40} rot={-60} fill={C.sageDeep} />
        <Leaf x={92} y={82} len={38} rot={-75} />
        <Leaf x={62} y={36} len={44} rot={55} />
        <Leaf x={92} y={66} len={40} rot={30} fill={C.sageDeep} />
        <Leaf x={132} y={90} len={42} rot={15} />
        <Leaf x={20} y={176} len={36} rot={-10} fill={C.sageDeep} op={0.7} />
        {/* blossoms */}
        <Blossom x={38} y={40} r={40} n={6} fill={C.blush} rot={10} />
        <Blossom x={96} y={26} r={22} n={5} fill={C.lilac} rot={30} center={C.cream} />
        <Blossom x={30} y={108} r={26} n={5} fill={C.peach} rot={-12} />
        <Blossom x={118} y={74} r={30} n={5} fill={C.rose} rot={20} op={0.8} />
        <Blossom x={170} y={104} r={16} n={5} fill={C.blush} rot={0} />
        <Blossom x={12} y={170} r={14} n={5} fill={C.lilac} rot={40} center={C.cream} />
        {/* buds */}
        <circle cx="150" cy="54" r="5" fill={C.rose} opacity="0.7" />
        <circle cx="68" cy="84" r="4" fill={C.lilac} opacity="0.85" />
        <circle cx="140" cy="130" r="3.5" fill={C.peach} opacity="0.9" />
        <circle cx="58" cy="168" r="3.5" fill={C.blush} opacity="0.9" />
      </g>
    </svg>
  );
}

/** Small centered divider sprig. */
export function FloralSprig({ className = '' }) {
  return (
    <svg
      className={`floral-sprig ${className}`}
      viewBox="0 0 220 44"
      aria-hidden="true"
      focusable="false"
    >
      <WatercolorDefs id="wc-sprig" />
      <g filter="url(#wc-sprig)">
        <path d="M10 22 H92 M128 22 H210" stroke={C.sageDeep} strokeWidth="1.2" opacity="0.55" />
        <Leaf x={92} y={22} len={26} rot={-160} />
        <Leaf x={128} y={22} len={26} rot={-20} />
        <Leaf x={80} y={24} len={20} rot={160} fill={C.sageDeep} op={0.7} />
        <Leaf x={140} y={24} len={20} rot={20} fill={C.sageDeep} op={0.7} />
        <Blossom x={110} y={22} r={17} n={6} fill={C.blush} rot={8} />
        <Blossom x={72} y={18} r={7} n={5} fill={C.lilac} center={C.cream} />
        <Blossom x={148} y={18} r={7} n={5} fill={C.peach} />
      </g>
    </svg>
  );
}

/** A few drifting petals (CSS animated). */
export function FloatingPetals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className={`petal petal-${i + 1}`} />
      ))}
    </div>
  );
}
