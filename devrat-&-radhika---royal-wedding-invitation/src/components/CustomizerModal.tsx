import { useState } from 'react';
import { X, Sliders, Check, RotateCcw } from 'lucide-react';
import { WeddingConfig } from '../types.ts';
import { initialWeddingConfig } from '../data/weddingData.ts';

interface CustomizerModalProps {
  isOpen: boolean;
  config: WeddingConfig;
  onSave: (newConfig: WeddingConfig) => void;
  onClose: () => void;
}

export default function CustomizerModal({
  isOpen,
  config,
  onSave,
  onClose,
}: CustomizerModalProps) {
  const [form, setForm] = useState<WeddingConfig>({ ...config });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const handleReset = () => {
    setForm({ ...initialWeddingConfig });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full rounded-2xl bg-[#1C070B] border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Sliders className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold text-[#FFF3B0]">
              Personalize Invitation Card
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#C5B393] hover:text-[#FAF5EE]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1">
                Groom Name
              </label>
              <input
                type="text"
                value={form.groomName}
                onChange={(e) => setForm({ ...form, groomName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#140508] border border-[#D4AF37]/30 text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1">
                Bride Name
              </label>
              <input
                type="text"
                value={form.brideName}
                onChange={(e) => setForm({ ...form, brideName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#140508] border border-[#D4AF37]/30 text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1">
              Venue Name
            </label>
            <input
              type="text"
              value={form.venueName}
              onChange={(e) => setForm({ ...form, venueName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#140508] border border-[#D4AF37]/30 text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1">
              Venue City &amp; State
            </label>
            <input
              type="text"
              value={form.venueCity}
              onChange={(e) => setForm({ ...form, venueCity: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#140508] border border-[#D4AF37]/30 text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1">
              Auspicious Muhurat Date &amp; Time
            </label>
            <input
              type="datetime-local"
              value={form.weddingDate.slice(0, 16)}
              onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#140508] border border-[#D4AF37]/30 text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-serif text-[#C5B393] hover:text-[#FAF5EE] border border-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-[#140508] bg-[#D4AF37] hover:bg-[#FFF3B0] shadow transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Apply Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
