import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types.ts';

interface OpeningCurtainProps {
  config: WeddingConfig;
  isOpen: boolean;
  onOpen: () => void;
}

export default function OpeningCurtain({ config, isOpen, onOpen }: OpeningCurtainProps) {
  const [opening, setOpening] = useState(false);

  if (isOpen) return null;

  const handleOpenClick = () => {
    setOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ${
        opening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      } bg-[#0D0305]/95 backdrop-blur-xl`}
    >
      {/* Decorative ambient radial gold glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      {/* Royal Sealed Invitation Card Envelope */}
      <div className="relative max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#1C070B] via-[#160408] to-[#0F0204] border border-[#D4AF37]/60 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(212,175,55,0.2)] text-center">
        {/* Gold Corner Filigrees */}
        <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#D4AF37]/80 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#D4AF37]/80 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#D4AF37]/80 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#D4AF37]/80 rounded-br-sm pointer-events-none" />

        {/* Lord Ganesha Shloka */}
        <div className="mb-5 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/60 p-2.5 flex items-center justify-center bg-[#2B080F]/70 shadow-inner mb-3">
            <svg viewBox="0 0 100 100" className="w-10 h-10 fill-[#D4AF37]" aria-label="Lord Ganesha Motif">
              <path d="M50 15 C45 15 38 18 35 24 C32 30 32 38 36 44 C34 46 32 49 31 53 C29 60 30 68 34 74 C38 80 44 83 50 83 C56 83 62 80 66 74 C70 68 71 60 69 53 C68 49 66 46 64 44 C68 38 68 30 65 24 C62 18 55 15 50 15 Z" opacity="0.95" />
              <circle cx="50" cy="30" r="3.5" fill="#FFF3B0" />
            </svg>
          </div>
          <p className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
        </div>

        {/* Royal Lineage Text */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#BFA888] font-serif">
          Royal Wedding Invitation
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] mt-3 tracking-wide">
          {config.groomName} <span className="text-[#D4AF37] italic font-normal">&amp;</span> {config.brideName}
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-[#C9B99E] font-serif">
          {config.venueName}, {config.venueCity}
        </p>
        <p className="text-xs text-[#D4AF37] font-serif mt-1">
          December 18 – 20, 2026
        </p>

        {/* The ONLY Click Required in the Whole Experience */}
        <div className="mt-8 pt-6 border-t border-[#D4AF37]/30">
          <button
            onClick={handleOpenClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-xs sm:text-sm font-serif font-bold uppercase tracking-[0.2em] text-[#140508] bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition-all group"
          >
            <Sparkles className="w-4 h-4 text-[#140508] group-hover:rotate-12 transition-transform" />
            <span>Open Royal Invitation</span>
          </button>
          <p className="text-[11px] text-[#A69376] font-serif mt-3 tracking-wide">
            Scroll smoothly to experience the ceremonies with video, flower petals &amp; sacred chant
          </p>
        </div>
      </div>
    </div>
  );
}
