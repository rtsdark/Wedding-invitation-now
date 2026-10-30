import { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Download, ExternalLink, Maximize2, Palette } from 'lucide-react';
import { ceremoniesData } from '../data/weddingData.ts';
import { Ceremony } from '../types.ts';

interface ProgrammesSectionProps {
  onSelectImage: (src: string, title: string, caption: string) => void;
}

export default function ProgrammesSection({ onSelectImage }: ProgrammesSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeTabCeremony, setActiveTabCeremony] = useState<Ceremony>(ceremoniesData[0]);

  const filteredCeremonies =
    selectedFilter === 'all'
      ? ceremoniesData
      : ceremoniesData.filter((c) => c.id === selectedFilter);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = (c: Ceremony) => {
    const title = encodeURIComponent(c.calendarTitle);
    const details = encodeURIComponent(
      `${c.description}\n\nVenue: ${c.venue}\nDress Code: ${c.dressCode}\nHighlights: ${c.highlights.join(', ')}`
    );
    const location = encodeURIComponent(`${c.venue}, The Oberoi Rajvilas, Jaipur`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Download .ics File
  const downloadIcs = (c: Ceremony) => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Devrat & Radhika Royal Wedding//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${c.calendarTitle}`,
      `DESCRIPTION:${c.description.replace(/\n/g, ' ')}`,
      `LOCATION:${c.venue}, Jaipur`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${c.id}-ceremony-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="programmes" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#140508] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            The Auspicious Wedding Programmes
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF5EE]">
            Sacred Ceremonies &amp; Festivities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D1C2A5] font-serif leading-relaxed">
            Each ritual carries sacred meaning and timeless royal traditions. Discover the celebration itinerary from the vibrant Mangal Haldi and Rang-e-Mehndi to the holy Saat Phere.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-[#20080E] border border-[#D4AF37]/30 shadow-inner">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-serif font-medium whitespace-nowrap transition-all ${
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F7CC64] text-[#140508] shadow-md font-semibold'
                  : 'text-[#D1C2A5] hover:text-[#FAF5EE]'
              }`}
            >
              All Ceremonies (6)
            </button>
            {ceremoniesData.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedFilter(c.id);
                  setActiveTabCeremony(c);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-serif font-medium whitespace-nowrap transition-all ${
                  selectedFilter === c.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F7CC64] text-[#140508] shadow-md font-semibold'
                    : 'text-[#D1C2A5] hover:text-[#FAF5EE]'
                }`}
              >
                {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Ceremonies Grid / Cards */}
        <div className="space-y-16">
          {filteredCeremonies.map((ceremony, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={ceremony.id}
                id={ceremony.id}
                className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#1E070C] to-[#120306] border border-[#D4AF37]/35 shadow-[0_15px_45px_rgba(0,0,0,0.7)] transition-all hover:border-[#D4AF37]/60 group"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left or Right: Image Visual (6 or 7 cols) */}
                  <div
                    className={`relative lg:col-span-7 min-h-[340px] sm:min-h-[420px] overflow-hidden ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <img
                      src={ceremony.image}
                      alt={ceremony.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1E070C]/90" />

                    {/* Expand image affordance */}
                    <button
                      onClick={() =>
                        onSelectImage(
                          ceremony.image,
                          ceremony.name,
                          `${ceremony.hindiName} · ${ceremony.venue}`
                        )
                      }
                      title="Inspect ceremony photo in high resolution"
                      className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-[#FFF3B0] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#140508] transition-colors shadow-lg"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Hindi Watermark / Kicker */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs uppercase tracking-widest text-[#FBBF24] font-serif block mb-1">
                        {ceremony.date}
                      </span>
                      <p className="font-serif text-xl sm:text-2xl font-bold text-[#FFF7ED] drop-shadow-md">
                        {ceremony.hindiName}
                      </p>
                    </div>
                  </div>

                  {/* Details / Narrative Container (5 cols) */}
                  <div
                    className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between lg:col-span-5 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      {/* Ceremony Header */}
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-serif mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Programme {idx + 1} of 6</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-wide mb-1">
                        {ceremony.name}
                      </h3>
                      <p className="text-xs text-[#C5B393] font-serif italic mb-4">
                        {ceremony.hindiName}
                      </p>

                      {/* Date, Time & Venue */}
                      <div className="space-y-2 py-3 border-y border-[#D4AF37]/20 text-xs sm:text-sm text-[#E5D7BF]">
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          <span>{ceremony.date}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          <span className="tabular-nums">{ceremony.time}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          <span>{ceremony.venue}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-4 text-xs sm:text-sm text-[#D1C2A5] font-serif leading-relaxed">
                        {ceremony.description}
                      </p>

                      {/* Key Highlights */}
                      <div className="mt-5">
                        <span className="text-[11px] uppercase tracking-wider text-[#A69376] font-semibold block mb-2">
                          Ceremonial Highlights
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#EADFCB]">
                          {ceremony.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#D4AF37] mt-0.5">✦</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Attire / Dress Code Palette */}
                      <div className="mt-5 p-3 rounded-xl bg-[#260A10]/70 border border-[#D4AF37]/20">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                            <Palette className="w-3.5 h-3.5" />
                            <span>Recommended Attire</span>
                          </span>
                          <span className="text-xs text-[#FFF3B0] font-medium text-right">
                            {ceremony.dressCode}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {ceremony.dressPalette.map((color, colorIdx) => (
                            <div
                              key={colorIdx}
                              className="h-4 flex-1 rounded-sm border border-white/20 shadow-sm"
                              style={{ backgroundColor: color }}
                              title={`Color code: ${color}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-3">
                      <a
                        href={getGoogleCalendarUrl(ceremony)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-serif font-medium text-[#140508] bg-[#D4AF37] hover:bg-[#FFF3B0] shadow transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Google Calendar</span>
                      </a>

                      <button
                        onClick={() => downloadIcs(ceremony)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-serif font-medium text-[#FAF5EE] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/15 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Download .ics</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
