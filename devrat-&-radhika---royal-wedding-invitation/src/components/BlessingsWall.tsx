import { useState } from 'react';
import { Heart, Sparkles, MessageCircle, Send } from 'lucide-react';
import { Blessing } from '../types.ts';

interface BlessingsWallProps {
  blessings: Blessing[];
  onAddBlessing: (b: Blessing) => void;
  onTriggerPetals: () => void;
}

export default function BlessingsWall({ blessings, onAddBlessing, onTriggerPetals }: BlessingsWallProps) {
  const [quickName, setQuickName] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [quickCity, setQuickCity] = useState('');
  const [showQuickForm, setShowQuickForm] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickMessage.trim()) return;

    const newB: Blessing = {
      id: `b-${Date.now()}`,
      author: quickName.trim(),
      relation: 'Family & Well-wisher',
      city: quickCity.trim() || 'Jaipur',
      message: quickMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    onAddBlessing(newB);
    onTriggerPetals();
    setQuickName('');
    setQuickMessage('');
    setQuickCity('');
    setShowQuickForm(false);
  };

  return (
    <section id="blessings" className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 text-center md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
              Ashirwad &amp; Good Wishes
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF5EE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              The Royal Blessings Wall
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#D1C2A5] font-serif drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Heartfelt words, ancestral prayers, and love shared by family and cherished guests.
            </p>
          </div>

          <button
            onClick={() => setShowQuickForm(!showQuickForm)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-serif font-medium text-[#140508] bg-gradient-to-r from-[#D4AF37] to-[#F7CC64] hover:brightness-110 transition-all shrink-0 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>{showQuickForm ? 'Close Blessing Box' : 'Write a Blessing'}</span>
          </button>
        </div>

        {/* Quick Blessing Drawer / Form */}
        {showQuickForm && (
          <form
            onSubmit={handleQuickSubmit}
            className="mb-12 p-6 rounded-2xl bg-[#1C070B] border border-[#D4AF37]/50 shadow-2xl max-w-2xl mx-auto space-y-4 text-center sm:text-left"
          >
            <h3 className="font-serif text-lg font-bold text-[#FFF3B0]">
              Offer Your Blessings to the Bride &amp; Groom
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Your Name (e.g., Smt. Sunita Devi)"
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                className="px-3.5 py-2 rounded-lg bg-[#140508] border border-[#D4AF37]/30 text-xs text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                placeholder="City / Relation (e.g., Udaipur)"
                value={quickCity}
                onChange={(e) => setQuickCity(e.target.value)}
                className="px-3.5 py-2 rounded-lg bg-[#140508] border border-[#D4AF37]/30 text-xs text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <textarea
              required
              rows={3}
              placeholder="Write your prayers, auspicious shloka, or wishes for Devrat & Radhika..."
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#140508] border border-[#D4AF37]/30 text-xs text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
            />
            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-[#140508] bg-[#D4AF37] hover:bg-[#FFF3B0] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Blessing &amp; Shower Flowers</span>
              </button>
            </div>
          </form>
        )}

        {/* Blessings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blessings.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-3xl bg-black/60 backdrop-blur-xl border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37]/70 transition-colors text-center sm:text-left"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#D4AF37] mb-3 font-serif">
                  <span className="tracking-widest uppercase">{b.relation}</span>
                  {b.city && <span className="text-[#8C7A62]">· {b.city}</span>}
                </div>
                <p className="font-serif italic text-sm text-[#FAF5EE] leading-relaxed text-center sm:text-left">
                  "{b.message}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[#FFF3B0]">
                  {b.author}
                </span>
                <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
