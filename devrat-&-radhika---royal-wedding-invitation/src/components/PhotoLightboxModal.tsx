import { X, ZoomIn } from 'lucide-react';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  src: string;
  title: string;
  caption: string;
  onClose: () => void;
}

export default function PhotoLightboxModal({
  isOpen,
  src,
  title,
  caption,
  onClose,
}: PhotoLightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full rounded-2xl overflow-hidden bg-[#180509] border border-[#D4AF37]/50 shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#23070E] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#FFF3B0] truncate">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#C5B393] hover:text-[#FAF5EE] hover:bg-white/10 transition-colors"
            aria-label="Close photo preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Image Content */}
        <div className="relative flex-1 overflow-auto bg-black/90 flex items-center justify-center p-2 sm:p-4">
          <img
            src={src}
            alt={title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Footer Caption */}
        {caption && (
          <div className="px-6 py-3.5 bg-[#1B060B] border-t border-[#D4AF37]/25 text-xs sm:text-sm font-serif text-[#E5D7BF] text-center">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
