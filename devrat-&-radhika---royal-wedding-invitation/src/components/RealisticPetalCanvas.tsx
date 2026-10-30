import { useEffect, useRef } from 'react';

export type CeremonyTheme =
  | 'welcome'
  | 'haldi'
  | 'mehndi'
  | 'sangeet'
  | 'baraat'
  | 'vivah'
  | 'reception';

interface RealisticPetalCanvasProps {
  currentTheme: CeremonyTheme;
  enabled?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayPhase: number;
  color: [number, number, number]; // [r, g, b]
  targetColor: [number, number, number];
  opacity: number;
}

// Color palettes for different ceremonies
const PALETTES: Record<CeremonyTheme, [number, number, number][]> = {
  // Bulk velvet red rose petals
  welcome: [
    [190, 18, 60], // Crimson Red
    [225, 29, 72], // Rose Red
    [159, 18, 57], // Deep Red
    [136, 19, 55], // Burgundy Velvet
    [244, 63, 94], // Rose Pink
    [212, 175, 55], // Gold shimmer petal
  ],
  // Radiant turmeric & marigold yellow petals
  haldi: [
    [251, 191, 36], // Marigold Yellow
    [245, 158, 11], // Marigold Orange
    [234, 179, 8],  // Turmeric Gold
    [254, 240, 138], // Fresh Lemon Yellow
    [217, 119, 6],  // Ochre Saffron
  ],
  // Fresh henna green & rani pink petals
  mehndi: [
    [16, 185, 129], // Fresh Mint Henna
    [5, 150, 105],  // Jade Green
    [4, 120, 87],   // Deep Emerald
    [244, 63, 94],  // Rani Pink
    [251, 191, 36], // Gold
  ],
  // Starlit royal sapphire, violet & champagne gold
  sangeet: [
    [212, 175, 55], // Champagne Gold
    [96, 165, 250], // Sapphire Blue
    [129, 140, 248], // Indigo Shimmer
    [244, 63, 94],  // Rose Gold
    [255, 243, 176], // Light Gold
  ],
  // Grand Baraat Rath: Saffron, Marigold & Royal Crimson
  baraat: [
    [220, 38, 38],  // Royal Red
    [245, 158, 11], // Auspicious Marigold
    [212, 175, 55], // Gilded Gold
    [185, 28, 28],  // Crimson
    [251, 191, 36], // Amber Gold
  ],
  // Shubh Vivah Pushp Varsha: Heavy Crimson Rose & Sacred Marigold
  vivah: [
    [190, 18, 60],  // Deep Rose Red
    [225, 29, 72],  // Vibrant Rose
    [153, 27, 27],  // Sacred Sindoor Red
    [245, 158, 11], // Fresh Marigold
    [251, 191, 36], // Bright Marigold
    [212, 175, 55], // Holy Gold
  ],
  // Royal Banquet / Reception: Velvet Rose & Champagne Gold
  reception: [
    [212, 175, 55], // Royal Gold
    [244, 63, 94],  // Rose Pink
    [190, 18, 60],  // Red Rose
    [255, 243, 176], // Champagne
  ],
};

export default function RealisticPetalCanvas({ currentTheme, enabled = true }: RealisticPetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Number of petals in bulk
    const isMobile = width < 768;
    const petalCount = isMobile ? 55 : 95;

    const getRandomColor = (theme: CeremonyTheme): [number, number, number] => {
      const colors = PALETTES[theme] || PALETTES.welcome;
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Initialize petals if empty
    if (petalsRef.current.length === 0) {
      const initialPetals: Petal[] = [];
      for (let i = 0; i < petalCount; i++) {
        const c = getRandomColor(currentTheme);
        initialPetals.push({
          x: Math.random() * width,
          y: Math.random() * height - height * 0.2, // Spread across screen from start!
          size: Math.random() * 10 + (isMobile ? 10 : 13),
          speedY: Math.random() * 1.6 + 1.1,
          speedX: (Math.random() - 0.5) * 0.8,
          rotX: Math.random() * Math.PI * 2,
          rotY: Math.random() * Math.PI * 2,
          rotZ: Math.random() * Math.PI * 2,
          rotSpeedX: (Math.random() - 0.5) * 0.04,
          rotSpeedY: (Math.random() - 0.5) * 0.05,
          rotSpeedZ: (Math.random() - 0.5) * 0.02,
          swayAmplitude: Math.random() * 35 + 15,
          swayFrequency: Math.random() * 0.003 + 0.0015,
          swayPhase: Math.random() * Math.PI * 2,
          color: [...c],
          targetColor: [...c],
          opacity: Math.random() * 0.35 + 0.65,
        });
      }
      petalsRef.current = initialPetals;
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const petals = petalsRef.current;
      const palette = PALETTES[currentTheme] || PALETTES.welcome;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Update physics
        p.y += p.speedY;
        const sway = Math.sin(time * p.swayFrequency + p.swayPhase) * 0.9;
        p.x += p.speedX + sway;

        // 3D Tumbling
        p.rotX += p.rotSpeedX;
        p.rotY += p.rotSpeedY;
        p.rotZ += p.rotSpeedZ;

        // Smoothly interpolate color towards current ceremony palette
        for (let c = 0; c < 3; c++) {
          p.color[c] += (p.targetColor[c] - p.color[c]) * 0.04;
        }

        // Recycle petal when it moves off bottom or side
        if (p.y > height + 30) {
          p.y = -25;
          p.x = Math.random() * width;
          const newC = palette[Math.floor(Math.random() * palette.length)];
          p.targetColor = [...newC];
          // If color is very far, jump halfway so it adapts quickly
          p.color[0] = (p.color[0] + newC[0]) / 2;
          p.color[1] = (p.color[1] + newC[1]) / 2;
          p.color[2] = (p.color[2] + newC[2]) / 2;
        }

        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        // Draw realistic organic petal with bezier curves & 3D tilt
        ctx.save();
        ctx.translate(p.x, p.y);

        // Apply 3D perspective tumbling
        const scaleX = Math.cos(p.rotY);
        const scaleY = Math.sin(p.rotX);
        ctx.rotate(p.rotZ);
        ctx.scale(Math.abs(scaleX) > 0.1 ? scaleX : 0.1, Math.abs(scaleY) > 0.1 ? scaleY : 0.1);

        const r = p.size;
        const [red, green, blue] = p.color.map(Math.round);

        // Petal shape via organic cubic beziers
        ctx.beginPath();
        ctx.moveTo(0, -r);
        // Right curve with natural petal flare
        ctx.bezierCurveTo(r * 0.9, -r * 0.6, r * 1.15, r * 0.5, 0, r * 1.1);
        // Left curve
        ctx.bezierCurveTo(-r * 1.15, r * 0.5, -r * 0.9, -r * 0.6, 0, -r);
        ctx.closePath();

        // Organic radial gradient with delicate edge highlight
        const grad = ctx.createRadialGradient(0, -r * 0.2, r * 0.1, 0, 0, r * 1.1);
        grad.addColorStop(0, `rgba(${Math.min(255, red + 35)}, ${Math.min(255, green + 35)}, ${Math.min(255, blue + 35)}, ${p.opacity})`);
        grad.addColorStop(0.75, `rgba(${red}, ${green}, ${blue}, ${p.opacity * 0.95})`);
        grad.addColorStop(1, `rgba(${Math.max(0, red - 30)}, ${Math.max(0, green - 30)}, ${Math.max(0, blue - 30)}, ${p.opacity * 0.85})`);

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle petal spine / vein line for realism
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.85);
        ctx.quadraticCurveTo(r * 0.08, 0, 0, r * 0.95);
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.18})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [enabled, currentTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
