import { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  groomName: string;
  brideName: string;
  onTriggerPetals: () => void;
  onOpenCustomizer?: () => void;
}

export default function Navbar({ groomName, brideName }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0F0306]/85 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#invitation"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#2A0A10]/60 text-[#D4AF37] font-serif text-sm tracking-widest shadow-inner group-hover:border-[#D4AF37] transition-colors">
            <span>D✦R</span>
          </div>
          <div className="text-left">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#FAF5EE] group-hover:text-[#F7CC64] transition-colors">
              {groomName} &amp; {brideName}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-serif font-medium tracking-wider text-[#E5D7BF]">
          <a
            href="#invitation"
            className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            The Invitation
          </a>
          <a
            href="#haldi"
            className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            Haldi
          </a>
          <a
            href="#mehndi"
            className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            Mehndi
          </a>
          <a
            href="#sangeet"
            className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            Sangeet
          </a>
          <a
            href="#baraat"
            className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            Baraat
          </a>
          <a
            href="#vivah"
            className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            Shubh Vivah
          </a>
          <a
            href="#venue"
            className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            Palace Venue
          </a>
        </nav>

        {/* Zone 3: RSVP CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#rsvp"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#140508] bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] rounded-lg shadow-md hover:brightness-110 active:scale-98 transition-all whitespace-nowrap shrink-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>RSVP</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#E5D7BF] hover:text-[#D4AF37] focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D4AF37]/20 bg-[#140407]/98 px-6 py-5 flex flex-col gap-4 text-sm font-medium">
          <a
            href="#invitation"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#FAF5EE] hover:text-[#D4AF37] py-1 border-b border-white/5 font-serif"
          >
            The Invitation
          </a>
          <a
            href="#haldi"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#FAF5EE] hover:text-[#D4AF37] py-1 border-b border-white/5 font-serif"
          >
            Mangal Haldi
          </a>
          <a
            href="#mehndi"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#FAF5EE] hover:text-[#D4AF37] py-1 border-b border-white/5 font-serif"
          >
            Rang-e-Mehndi
          </a>
          <a
            href="#sangeet"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#FAF5EE] hover:text-[#D4AF37] py-1 border-b border-white/5 font-serif"
          >
            Jashn-e-Sangeet
          </a>
          <a
            href="#baraat"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#FAF5EE] hover:text-[#D4AF37] py-1 border-b border-white/5 font-serif"
          >
            Shahi Baraat
          </a>
          <a
            href="#vivah"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#FAF5EE] hover:text-[#D4AF37] py-1 border-b border-white/5 font-serif"
          >
            Shubh Vivah
          </a>
          <a
            href="#venue"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#FAF5EE] hover:text-[#D4AF37] py-1 border-b border-white/5 font-serif"
          >
            Palace Venue
          </a>
          <a
            href="#rsvp"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#D4AF37] font-semibold py-1 font-serif"
          >
            RSVP
          </a>
        </div>
      )}
    </header>
  );
}
