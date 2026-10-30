import { useRef, useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Palette } from 'lucide-react';
import FloralArchGarland from './FloralArchGarland.tsx';

export interface CeremonyItem {
  id: string;
  theme: 'haldi' | 'mehndi' | 'sangeet' | 'baraat' | 'vivah' | 'reception';
  name: string;
  hindiName: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  highlights: string[];
  dressCode: string;
  dressPalette: string[];
  image: string;
  imageAlt: string;
  reverseLayout?: boolean;
}

interface ParallaxCeremonyProps {
  ceremony: CeremonyItem;
  index: number;
}

export default function ParallaxCeremony({ ceremony, index }: ParallaxCeremonyProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [intensity, setIntensity] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section center relative to viewport center
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distFromCenter = Math.abs(sectionCenter - viewportCenter);

      // Active range where the ceremony appears & disappears
      const activeRange = windowHeight * 0.72;

      // Smoothly rises to 1 at center, drops to 0 above and below
      let norm = 1 - distFromCenter / activeRange;
      norm = Math.max(0, Math.min(1, norm));

      // Ease curve for smooth cinematic fade
      const eased = Math.sin((norm * Math.PI) / 2);

      // Parallax glide: image shifts vertically as user scrolls
      const yOffset = (sectionCenter - viewportCenter) * 0.16;

      setIntensity(eased);
      setParallaxY(yOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scale smoothly from 0.88 to 1.02 based on visibility
  const scale = 0.88 + intensity * 0.14;
  // Blur softens when far from center, crisp at center
  const blurAmount = (1 - intensity) * 4;

  return (
    <section
      ref={sectionRef}
      id={ceremony.id}
      data-theme={ceremony.theme}
      className="relative min-h-[95vh] lg:min-h-[110vh] py-16 lg:py-28 px-4 sm:px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
            ceremony.reverseLayout ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Unboxed Image Element - Organic curved arched silhouette blending with background video */}
          <div
            className={`relative lg:col-span-7 flex justify-center ${
              ceremony.reverseLayout ? 'lg:order-2' : 'lg:order-1'
            }`}
            style={{
              opacity: intensity,
              transform: `translateY(${parallaxY}px) scale(${scale})`,
              filter: `blur(${blurAmount}px)`,
              transition: 'opacity 0.15s ease-out, transform 0.15s ease-out, filter 0.15s ease-out',
              willChange: 'opacity, transform, filter',
            }}
          >
            {/* Ambient golden aura that blooms as the image appears */}
            <div
              className="absolute inset-0 max-w-lg mx-auto rounded-full bg-gradient-to-tr from-[#D4AF37]/25 via-[#F59E0B]/20 to-transparent blur-3xl pointer-events-none transition-opacity duration-300"
              style={{ opacity: intensity }}
            />

            {/* The Image in True Semi-Circle with Bulky Decorative Flower Bundle on Curved Edge */}
            <div className="relative max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] w-full group flex flex-col items-center">
              {/* Semi-Circle Container with Flower Bundle */}
              <div className="relative w-full aspect-[16/10] pt-6 sm:pt-8 px-4 sm:px-6">
                {/* The Bulky Decorative Thick Flower Bundle along the Semi-Circle Arc */}
                <FloralArchGarland
                  theme={ceremony.theme}
                  className="-top-4 sm:-top-6 -left-3 sm:-left-4 -right-3 sm:-right-4 h-[115%]"
                />

                {/* The Semi-Circle Image itself */}
                <div
                  className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-xl border-t-2 border-x border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.85)] z-10"
                  style={{
                    borderTopLeftRadius: '9999px',
                    borderTopRightRadius: '9999px',
                  }}
                >
                  <img
                    src={ceremony.image}
                    alt={ceremony.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-105 contrast-105 transition-transform duration-1000 group-hover:scale-105 select-none"
                  />

                  {/* Soft bottom atmospheric gradient blending with the background video */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0204]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Ceremony Hindi Name Calligraphy below the Semi-Circle */}
              <div
                className="mt-4 pointer-events-none transition-opacity duration-300 text-center"
                style={{ opacity: intensity }}
              >
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF3B0] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] tracking-wider">
                  {ceremony.hindiName}
                </span>
              </div>
            </div>
          </div>

          {/* Details & Narrative Container - Appears & disappears in sync with scrolling */}
          <div
            className={`lg:col-span-5 text-center lg:text-left relative z-10 ${
              ceremony.reverseLayout ? 'lg:order-1' : 'lg:order-2'
            }`}
            style={{
              opacity: intensity,
              transform: `translateY(${parallaxY * 0.7}px)`,
              transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
              willChange: 'opacity, transform',
            }}
          >
            {/* Kicker */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Ceremony {index + 1} of 7</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF5EE] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-center lg:text-left">
              {ceremony.name}
            </h2>

            {/* Date, Time & Venue */}
            <div className="mt-4 pt-3 pb-4 border-y border-[#D4AF37]/30 space-y-2 text-xs sm:text-sm text-[#E5D7BF] font-serif drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] flex flex-col items-center lg:items-start">
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="tracking-wide font-medium">{ceremony.date}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="tracking-wide tabular-nums">{ceremony.time}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="tracking-wide">{ceremony.venue}</span>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="mt-5 text-sm sm:text-base text-[#E0D3BE] font-serif leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] text-center lg:text-left">
              {ceremony.description}
            </p>

            {/* Ceremonial Highlights */}
            <div className="mt-6 text-center lg:text-left">
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2.5 text-center lg:text-left">
                Ceremonial Highlights
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#EADFCB] font-serif flex flex-col items-center lg:items-start">
                {ceremony.highlights.map((h, i) => (
                  <li key={i} className="flex items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
                    <span className="text-[#D4AF37] shrink-0">✦</span>
                    <span className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attire / Dress Code Palette */}
            <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-3 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Palette className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-serif font-medium">
                  Attire:
                </span>
                <span className="text-xs text-[#FFF3B0] font-serif font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {ceremony.dressCode}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                {ceremony.dressPalette.map((color, cIdx) => (
                  <span
                    key={cIdx}
                    className="w-4 h-4 rounded-full border border-white/40 shadow-sm shrink-0"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
