import { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronDown, Clock, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types.ts';

interface HeroProps {
  config: WeddingConfig;
}

export default function Hero({ config }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(config.weddingDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.weddingDate]);

  return (
    <section
      id="invitation"
      className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Soft central ambient radial glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        {/* Lord Ganesha Invocation & Shloka */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/70 p-2.5 flex items-center justify-center bg-[#2B080F]/60 backdrop-blur-md shadow-2xl mb-3">
            <svg viewBox="0 0 100 100" className="w-10 h-10 fill-[#D4AF37]" aria-label="Lord Ganesha Motif">
              <path d="M50 15 C45 15 38 18 35 24 C32 30 32 38 36 44 C34 46 32 49 31 53 C29 60 30 68 34 74 C38 80 44 83 50 83 C56 83 62 80 66 74 C70 68 71 60 69 53 C68 49 66 46 64 44 C68 38 68 30 65 24 C62 18 55 15 50 15 Z" opacity="0.95" />
              <circle cx="50" cy="30" r="3.5" fill="#FFF3B0" />
            </svg>
          </div>
          <p className="text-sm sm:text-base font-serif tracking-[0.3em] text-[#D4AF37] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="mt-1.5 text-xs sm:text-sm font-serif italic text-[#C9B99E] max-w-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
          </p>
        </div>

        {/* Preamble */}
        <div className="pt-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#A69376] font-medium block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Together with their families
          </span>
          <p className="text-sm sm:text-base text-[#FAF5EE] mt-1 font-serif drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            request the pleasure of your company to celebrate the wedding union of
          </p>
        </div>

        {/* Couple Names - Grand Typography directly over video */}
        <div className="py-2">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
            <div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF5EE] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {config.groomName}
              </h1>
              <p className="text-xs text-[#D4AF37] font-serif tracking-widest uppercase mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Son of the Rathore &amp; Singhania Lineage
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#D4AF37] py-2 md:py-0">
              <span className="h-[1px] w-6 sm:w-12 bg-[#D4AF37]/60" />
              <span className="font-serif text-3xl sm:text-4xl italic text-[#F59E0B] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">&amp;</span>
              <span className="h-[1px] w-6 sm:w-12 bg-[#D4AF37]/60" />
            </div>

            <div>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF5EE] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {config.brideName}
              </h2>
              <p className="text-xs text-[#D4AF37] font-serif tracking-widest uppercase mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Daughter of the Verma &amp; Shekhawat Lineage
              </p>
            </div>
          </div>
        </div>

        {/* Auspicious Muhurat & Venue */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#FAF5EE] font-serif">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-[#D4AF37]/30">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium tracking-wide">December 18 – 20, 2026</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-[#D4AF37]/30">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium tracking-wide">{config.venueName}, {config.venueCity}</span>
          </div>
        </div>

        {/* Live Countdown Clock - Semi-transparent frosted golden borders */}
        <div className="pt-4 max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs uppercase tracking-widest text-[#D4AF37] font-serif">
            <Clock className="w-3.5 h-3.5" />
            <span>Auspicious Muhurat Countdown</span>
          </div>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
            <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 shadow-lg">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF7ED] tabular-nums block">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C5B393]">Days</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 shadow-lg">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF7ED] tabular-nums block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C5B393]">Hours</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 shadow-lg">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF7ED] tabular-nums block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C5B393]">Minutes</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 shadow-lg">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#D4AF37] tabular-nums block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C5B393]">Seconds</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - No click required, only scroll */}
        <div className="pt-8 flex flex-col items-center justify-center gap-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif animate-pulse">
            Scroll to experience ceremonies
          </span>
          <ChevronDown className="w-5 h-5 text-[#D4AF37] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
