import { useState } from 'react';
import { Maximize2, Sparkles, Filter } from 'lucide-react';
import { galleryPhotos } from '../data/weddingData.ts';

interface GallerySectionProps {
  onSelectImage: (src: string, title: string, caption: string) => void;
}

export default function GallerySection({ onSelectImage }: GallerySectionProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredPhotos =
    filter === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.ceremony.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="gallery" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#100305] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            Palace Visuals &amp; Auspicious Moments
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF5EE]">
            The Royal Visual Gallery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D1C2A5] font-serif leading-relaxed">
            Immerse yourself in the handcrafted decor, royal carriages, and sacred mandaps curated for Devrat &amp; Radhika's auspicious union.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#1D060B] border border-[#D4AF37]/30">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-serif transition-all ${
                filter === 'all'
                  ? 'bg-[#D4AF37] text-[#140508] font-semibold'
                  : 'text-[#C5B393] hover:text-[#FAF5EE]'
              }`}
            >
              All Visuals ({galleryPhotos.length})
            </button>
            <button
              onClick={() => setFilter('haldi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-serif transition-all ${
                filter === 'haldi'
                  ? 'bg-[#D4AF37] text-[#140508] font-semibold'
                  : 'text-[#C5B393] hover:text-[#FAF5EE]'
              }`}
            >
              Haldi
            </button>
            <button
              onClick={() => setFilter('mehndi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-serif transition-all ${
                filter === 'mehndi'
                  ? 'bg-[#D4AF37] text-[#140508] font-semibold'
                  : 'text-[#C5B393] hover:text-[#FAF5EE]'
              }`}
            >
              Mehndi
            </button>
            <button
              onClick={() => setFilter('sangeet')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-serif transition-all ${
                filter === 'sangeet'
                  ? 'bg-[#D4AF37] text-[#140508] font-semibold'
                  : 'text-[#C5B393] hover:text-[#FAF5EE]'
              }`}
            >
              Sangeet
            </button>
            <button
              onClick={() => setFilter('baraat')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-serif transition-all ${
                filter === 'baraat'
                  ? 'bg-[#D4AF37] text-[#140508] font-semibold'
                  : 'text-[#C5B393] hover:text-[#FAF5EE]'
              }`}
            >
              Baraat &amp; Rath
            </button>
            <button
              onClick={() => setFilter('vivah')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-serif transition-all ${
                filter === 'vivah'
                  ? 'bg-[#D4AF37] text-[#140508] font-semibold'
                  : 'text-[#C5B393] hover:text-[#FAF5EE]'
              }`}
            >
              Vivah Mandap
            </button>
          </div>
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectImage(photo.src, photo.title, photo.caption)}
              className="group relative rounded-2xl overflow-hidden bg-[#1B060A] border border-[#D4AF37]/30 shadow-lg cursor-pointer transition-all hover:border-[#D4AF37] hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.2)]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black/50">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
              </div>

              {/* Overlay on hover / subtle permanent bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 transition-opacity">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-serif font-medium">
                    {photo.ceremony}
                  </span>
                  <div className="p-1.5 rounded-lg bg-black/60 text-[#D4AF37] border border-[#D4AF37]/30 opacity-90 group-hover:opacity-100 group-hover:bg-[#D4AF37] group-hover:text-[#140508] transition-all">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-bold text-[#FFF7ED] leading-snug line-clamp-1 group-hover:text-[#FFF3B0] transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-[#D1C2A5] font-serif line-clamp-2 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
