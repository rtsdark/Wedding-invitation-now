import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
}

interface PetalShowerProps {
  active: boolean;
  onComplete?: () => void;
}

export default function PetalShower({ active, onComplete }: PetalShowerProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) {
      setPetals([]);
      return;
    }

    const colors = [
      '#F43F5E', // Rose pink
      '#E11D48', // Deep rose
      '#BE123C', // Crimson red
      '#D4AF37', // Gold petal
      '#F59E0B', // Marigold orange
      '#FBBF24', // Marigold yellow
    ];

    const newPetals: Petal[] = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      left: Math.random() * 98,
      size: Math.floor(Math.random() * 14) + 12,
      duration: Math.random() * 3.5 + 3.5,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.floor(Math.random() * 360),
    }));

    setPetals(newPetals);

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 7000);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active || petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            animation: `petalFall ${petal.duration}s linear ${petal.delay}s forwards`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
            }}
          >
            <path
              d="M12 0C6 8 0 16 0 24C0 28.4 5.4 32 12 32C18.6 32 24 28.4 24 24C24 16 18 8 12 0Z"
              fill={petal.color}
              opacity={0.88}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
