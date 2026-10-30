import { useMemo } from 'react';
import { CeremonyTheme } from './RealisticPetalCanvas.tsx';

interface FloralArchGarlandProps {
  theme: CeremonyTheme;
  className?: string;
}

interface FlowerPoint {
  id: number;
  x: number;
  y: number;
  angle: number; // in degrees
  size: number;
  type: 'primary' | 'secondary' | 'accent' | 'leaf';
  rotation: number;
}

export default function FloralArchGarland({ theme, className = '' }: FloralArchGarlandProps) {
  // Color palette for thick flower bundle based on ceremony
  const colors = useMemo(() => {
    switch (theme) {
      case 'haldi':
        return {
          garlandBase: '#D97706',
          primaryFlower: '#F59E0B',    // Bright Marigold Orange
          primaryCenter: '#B45309',
          secondaryFlower: '#FBBF24',  // Sunny Yellow
          secondaryCenter: '#D97706',
          accentFlower: '#FEF08A',     // Pale Jasmine/Lemon
          accentCenter: '#EAB308',
          leaf: '#15803D',             // Mango leaf green
          leafDark: '#166534',
          goldAccent: '#FDE047',
        };
      case 'mehndi':
        return {
          garlandBase: '#047857',
          primaryFlower: '#EC4899',    // Rani Pink Rose
          primaryCenter: '#BE185D',
          secondaryFlower: '#10B981',  // Jade Blossom
          secondaryCenter: '#047857',
          accentFlower: '#F472B6',     // Blush Blossom
          accentCenter: '#9D174D',
          leaf: '#065F46',             // Henna Green leaf
          leafDark: '#064E3B',
          goldAccent: '#FBBF24',
        };
      case 'sangeet':
        return {
          garlandBase: '#1E3A8A',
          primaryFlower: '#D4AF37',    // Royal Gold Rose
          primaryCenter: '#854D0E',
          secondaryFlower: '#60A5FA',  // Starlit Sapphire
          secondaryCenter: '#1E40AF',
          accentFlower: '#E0E7FF',     // White Jasmine
          accentCenter: '#3B82F6',
          leaf: '#1E293B',             // Indigo night leaf
          leafDark: '#0F172A',
          goldAccent: '#FEF08A',
        };
      case 'baraat':
        return {
          garlandBase: '#991B1B',
          primaryFlower: '#DC2626',    // Crimson Royal Rose
          primaryCenter: '#7F1D1D',
          secondaryFlower: '#F59E0B',  // Auspicious Marigold
          secondaryCenter: '#B45309',
          accentFlower: '#FBBF24',     // Gold Blossom
          accentCenter: '#D97706',
          leaf: '#14532D',             // Royal Green
          leafDark: '#052E16',
          goldAccent: '#FDE047',
        };
      case 'vivah':
        return {
          garlandBase: '#881337',
          primaryFlower: '#E11D48',    // Sacred Crimson Rose
          primaryCenter: '#9F1239',
          secondaryFlower: '#F59E0B',  // Marigold Garland
          secondaryCenter: '#B45309',
          accentFlower: '#FFFBEB',     // Mogra / Jasmine White
          accentCenter: '#D4AF37',
          leaf: '#166534',             // Sacred Betel / Mango leaf
          leafDark: '#14532D',
          goldAccent: '#FBBF24',
        };
      case 'reception':
      default:
        return {
          garlandBase: '#854D0E',
          primaryFlower: '#D4AF37',    // Gilded Champagne Rose
          primaryCenter: '#713F12',
          secondaryFlower: '#FB7185',  // Velvet Peach/Rose
          secondaryCenter: '#9F1239',
          accentFlower: '#FFFDF5',     // Pearl White Orchid
          accentCenter: '#CA8A04',
          leaf: '#15803D',
          leafDark: '#166534',
          goldAccent: '#FEF08A',
        };
    }
  }, [theme]);

  // Points along the semi-circle arc for dense bulky floral bundle
  // Center (300, 310), Radius = 260
  // Theta from Math.PI (180deg - left) to 0 (0deg - right)
  const flowers: FlowerPoint[] = useMemo(() => {
    const list: FlowerPoint[] = [];
    const count = 27; // Dense blossom count
    const cx = 300;
    const cy = 310;
    const radius = 262;

    for (let i = 0; i <= count; i++) {
      const t = i / count;
      // Angle in radians: from PI to 0
      const angleRad = Math.PI - t * Math.PI;
      const angleDeg = (angleRad * 180) / Math.PI;

      // Small jitter for natural organic bulky bundle
      const rJitter = radius + ((i % 2 === 0 ? 1 : -1) * (i % 3 === 0 ? 9 : 4));
      const x = cx + rJitter * Math.cos(angleRad);
      const y = cy - rJitter * Math.sin(angleRad);

      const type: 'primary' | 'secondary' | 'accent' =
        i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'accent';

      list.push({
        id: i,
        x,
        y,
        angle: angleDeg,
        size: i % 2 === 0 ? 32 : 28,
        type,
        rotation: (i * 47) % 360,
      });
    }

    return list;
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-20 ${className}`}
      style={{ overflow: 'visible' }}
    >
      <svg
        viewBox="0 0 600 350"
        className="w-full h-full overflow-visible drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Bulky Garland Tube Shadow / Foundation */}
          <linearGradient id={`garland-grad-${theme}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.garlandBase} stopOpacity="0.9" />
            <stop offset="50%" stopColor={colors.primaryFlower} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.garlandBase} stopOpacity="0.9" />
          </linearGradient>

          {/* Golden radial shimmer for flower centers */}
          <radialGradient id={`flower-gold-${theme}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="60%" stopColor={colors.goldAccent} />
            <stop offset="100%" stopColor={colors.secondaryCenter} />
          </radialGradient>
        </defs>

        {/* 1. Underlying Thick Bulky Floral Garland Rope/Tube */}
        {/* Radius 262, semi-circle arc from left (38, 310) to top (300, 48) to right (562, 310) */}
        <path
          d="M 38 310 A 262 262 0 0 1 562 310"
          fill="none"
          stroke={`url(#garland-grad-${theme})`}
          strokeWidth="44"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 2. Secondary textured inner leafy garland strand */}
        <path
          d="M 44 310 A 256 256 0 0 1 556 310"
          fill="none"
          stroke={colors.leafDark}
          strokeWidth="32"
          strokeLinecap="round"
          strokeDasharray="14 8"
          opacity="0.75"
        />

        {/* 3. Mango & Betel Leaves Layer tucked behind flowers */}
        {flowers.map((f, idx) => {
          if (idx % 2 !== 0) return null;
          return (
            <g
              key={`leaf-${f.id}`}
              transform={`translate(${f.x}, ${f.y}) rotate(${f.rotation})`}
            >
              {/* Left Leaf */}
              <path
                d="M 0 0 C -16 -12 -26 -6 -28 6 C -20 18 -8 10 0 0 Z"
                fill={colors.leaf}
                opacity="0.95"
              />
              <path
                d="M 0 0 C -12 -5 -20 -1 -24 5"
                stroke={colors.leafDark}
                strokeWidth="1.2"
                fill="none"
              />
              {/* Right Leaf */}
              <path
                d="M 0 0 C 16 -12 26 -6 28 6 C 20 18 8 10 0 0 Z"
                fill={colors.leafDark}
                opacity="0.9"
              />
            </g>
          );
        })}

        {/* 4. Bulky Floral Blossoms (Marigolds, Roses & Jasmine) Layer */}
        {flowers.map((f) => {
          const isPrimary = f.type === 'primary';
          const isSecondary = f.type === 'secondary';

          const mainColor = isPrimary
            ? colors.primaryFlower
            : isSecondary
            ? colors.secondaryFlower
            : colors.accentFlower;

          const centerColor = isPrimary
            ? colors.primaryCenter
            : isSecondary
            ? colors.secondaryCenter
            : colors.accentCenter;

          const r = f.size;

          return (
            <g
              key={`flower-${f.id}`}
              transform={`translate(${f.x}, ${f.y}) rotate(${f.rotation})`}
            >
              {/* Outer petal ring (layered scallop for marigold / rose volume) */}
              <circle
                r={r * 0.95}
                fill={mainColor}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))"
              />

              {/* Scalloped petals (8-fold floral burst) */}
              <path
                d={`
                  M 0 ${-r}
                  Q ${r * 0.35} ${-r * 0.9} ${r * 0.7} ${-r * 0.7}
                  Q ${r * 0.9} ${-r * 0.35} ${r} 0
                  Q ${r * 0.9} ${r * 0.35} ${r * 0.7} ${r * 0.7}
                  Q ${r * 0.35} ${r * 0.9} 0 ${r}
                  Q ${-r * 0.35} ${r * 0.9} ${-r * 0.7} ${r * 0.7}
                  Q ${-r * 0.9} ${r * 0.35} ${-r} 0
                  Q ${-r * 0.9} ${-r * 0.35} ${-r * 0.7} ${-r * 0.7}
                  Q ${-r * 0.35} ${-r * 0.9} 0 ${-r}
                  Z
                `}
                fill={mainColor}
              />

              {/* Inner Petal Layer (offset for dense ruffled bloom) */}
              <circle
                r={r * 0.65}
                fill={centerColor}
                opacity="0.9"
              />

              {/* Ruffled rosette folds */}
              <path
                d={`
                  M 0 ${-r * 0.6}
                  Q ${r * 0.3} ${-r * 0.5} ${r * 0.5} ${-r * 0.4}
                  Q ${r * 0.5} 0 ${r * 0.4} ${r * 0.4}
                  Q 0 ${r * 0.5} ${-r * 0.4} ${r * 0.4}
                  Q ${-r * 0.5} 0 ${-r * 0.4} ${-r * 0.4}
                  Z
                `}
                fill={mainColor}
                opacity="0.9"
              />

              {/* Core golden pollen center / stamen */}
              <circle
                r={r * 0.32}
                fill={`url(#flower-gold-${theme})`}
              />
              <circle
                r={r * 0.14}
                fill="#FFFBEB"
              />
            </g>
          );
        })}

        {/* 5. Traditional Toran Hanging Flower Tassels at Left and Right Base */}
        {/* Left Tassel */}
        <g transform="translate(36, 310)">
          <line x1="0" y1="0" x2="0" y2="48" stroke={colors.goldAccent} strokeWidth="2.5" />
          <circle cx="0" cy="14" r="10" fill={colors.secondaryFlower} />
          <circle cx="0" cy="30" r="12" fill={colors.primaryFlower} />
          <circle cx="0" cy="46" r="14" fill={colors.accentFlower} />
          {/* Golden bell drop */}
          <path d="M -7 50 L 7 50 L 4 60 L -4 60 Z" fill={colors.goldAccent} />
        </g>

        {/* Right Tassel */}
        <g transform="translate(564, 310)">
          <line x1="0" y1="0" x2="0" y2="48" stroke={colors.goldAccent} strokeWidth="2.5" />
          <circle cx="0" cy="14" r="10" fill={colors.secondaryFlower} />
          <circle cx="0" cy="30" r="12" fill={colors.primaryFlower} />
          <circle cx="0" cy="46" r="14" fill={colors.accentFlower} />
          {/* Golden bell drop */}
          <path d="M -7 50 L 7 50 L 4 60 L -4 60 Z" fill={colors.goldAccent} />
        </g>
      </svg>
    </div>
  );
}
