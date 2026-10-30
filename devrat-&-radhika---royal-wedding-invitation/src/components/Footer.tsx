import { useState } from 'react';
import { Share2, ArrowUp, Sparkles, Check, Sliders, Calendar } from 'lucide-react';
import { WeddingConfig } from '../types.ts';

interface FooterProps {
  config: WeddingConfig;
  onOpenCustomizer: () => void;
  onTriggerPetals: () => void;
}

export default function Footer({ config, onOpenCustomizer, onTriggerPetals }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${config.groomName} & ${config.brideName} - Royal Wedding Invitation`,
      text: `Join us in celebrating the royal wedding of ${config.groomName} & ${config.brideName} in Jaipur, Rajasthan!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0204] border-t border-[#D4AF37]/30 text-center relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Sanskrit Auspicious Shanti Mantra */}
        <div className="space-y-2">
          <p className="font-serif text-sm sm:text-base text-[#D4AF37] tracking-[0.2em] uppercase">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#C5B393] italic">
            "May all beings be filled with happiness, health, and eternal peace."
          </p>
        </div>

        {/* Folded Hands Blessing */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#170407] border border-[#D4AF37]/25 max-w-2xl mx-auto shadow-inner">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 mx-auto mb-3 flex items-center justify-center bg-[#25080E] text-[#D4AF37] text-lg font-serif">
            🙏
          </div>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF5EE]">
            With Warmest Regards &amp; Folded Hands
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-[#E5D7BF] font-serif leading-relaxed">
            {config.groomFamily} &amp; {config.brideFamily} look forward to welcoming you to Jaipur with royal Rajasthani hospitality (Manwar &amp; Seva).
          </p>
        </div>

        {/* Utility Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-serif">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C070B] text-[#FAF5EE] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/15 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Share2 className="w-4 h-4 text-[#D4AF37]" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Share Invitation Card'}</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C070B] text-[#FAF5EE] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/15 transition-colors"
          >
            <Sliders className="w-4 h-4 text-[#D4AF37]" />
            <span>Customize Card Names &amp; Date</span>
          </button>

          <button
            onClick={onTriggerPetals}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C070B] text-[#FBBF24] border border-[#F59E0B]/40 hover:bg-[#F59E0B]/15 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pushp Varsha</span>
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1C070B] text-[#C5B393] border border-white/10 hover:text-[#FAF5EE] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>

        <div className="pt-6 border-t border-[#D4AF37]/15 text-xs text-[#8C7A62]">
          <p>© 2026 {config.groomName} &amp; {config.brideName} Royal Wedding · All Auspicious Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
