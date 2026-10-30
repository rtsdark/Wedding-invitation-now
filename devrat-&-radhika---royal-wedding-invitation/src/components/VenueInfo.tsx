import { MapPin, Navigation, Compass, Phone, Sparkles, SunDim, ShieldCheck } from 'lucide-react';
import { WeddingConfig } from '../types.ts';

interface VenueInfoProps {
  config: WeddingConfig;
}

export default function VenueInfo({ config }: VenueInfoProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${config.venueName}, ${config.venueFullAddress}`
  )}`;

  return (
    <section id="venue" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            The Royal Destination
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF5EE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Palace Grounds &amp; Guest Guide
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D1C2A5] font-serif leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Set amidst 32 acres of landscaped gardens, ancient banyan trees, and ornate Rajasthani stone arches in the Pink City of Jaipur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left card: Venue & Navigation (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/35 shadow-2xl flex flex-col justify-between text-center lg:text-left">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-serif mb-2">
                <MapPin className="w-4 h-4 text-[#F59E0B]" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE]">
                {config.venueName}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#C5B393] font-serif leading-relaxed">
                {config.venueFullAddress}
              </p>

              {/* Venue features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#D4AF37]/20 text-xs text-[#EADFCB]">
                <div className="p-3.5 rounded-xl bg-[#25080E]/80 border border-[#D4AF37]/20 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[#D4AF37] font-semibold mb-1">
                    <Navigation className="w-4 h-4" />
                    <span>Airport Transfers</span>
                  </div>
                  <p className="text-[#C5B393] leading-relaxed">
                    Dedicated luxury chauffeur shuttles arranged from Jaipur International Airport (JAI), located 25 minutes away.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#25080E]/80 border border-[#D4AF37]/20 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[#D4AF37] font-semibold mb-1">
                    <SunDim className="w-4 h-4" />
                    <span>December Weather</span>
                  </div>
                  <p className="text-[#C5B393] leading-relaxed">
                    Sunny crisp daytime temperatures (~24°C / 75°F) with cool royal evening breezes (~10°C / 50°F). Light pashmina shawls advised.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#140508] bg-gradient-to-r from-[#D4AF37] to-[#F7CC64] shadow hover:brightness-110 transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href="tel:+911412680101"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-serif text-[#FAF5EE] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Palace Concierge</span>
              </a>
            </div>
          </div>

          {/* Right card: Hospitality & Helpline (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/35 shadow-2xl flex flex-col justify-between text-center lg:text-left">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-serif block mb-2 text-center lg:text-left">
                Atithi Devo Bhava
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF7ED]">
                Royal Hospitality &amp; Assistance
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#C5B393] font-serif leading-relaxed">
                Should you require assistance regarding hotel suites, luggage handling, dietary accommodations, or transport, our family concierge desk is available 24/7.
              </p>

              <div className="mt-6 space-y-3 text-xs text-[#E5D7BF]">
                <div className="p-3 rounded-lg bg-[#27090F]/60 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#FFF3B0] font-semibold mb-0.5">
                    <span className="text-[#D4AF37] font-bold">✦</span>
                    <span>Guest Check-in:</span>
                  </div>
                  <span className="text-[#C5B393]">Commencing 12:00 PM, Friday, Dec 18, 2026.</span>
                </div>

                <div className="p-3 rounded-lg bg-[#27090F]/60 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#FFF3B0] font-semibold mb-0.5">
                    <span className="text-[#D4AF37] font-bold">✦</span>
                    <span>Dress Draping &amp; Safa Tying:</span>
                  </div>
                  <span className="text-[#C5B393]">Turban specialists and sari drapery artists available in the Hospitality Lounge before Baraat.</span>
                </div>

                <div className="p-3 rounded-lg bg-[#27090F]/60 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#FFF3B0] font-semibold mb-0.5">
                    <span className="text-[#D4AF37] font-bold">✦</span>
                    <span>Valet &amp; Security:</span>
                  </div>
                  <span className="text-[#C5B393]">Complimentary royal valet parking available at the main Palace Archway.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-center lg:justify-between gap-2 text-xs text-[#A69376]">
              <span>RSVP Contact: hospitality@devrat-radhika.in</span>
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
