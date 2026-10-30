import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import BackgroundVideoLoop from './components/BackgroundVideoLoop.tsx';
import RealisticPetalCanvas, { CeremonyTheme } from './components/RealisticPetalCanvas.tsx';
import OpeningCurtain from './components/OpeningCurtain.tsx';
import ParallaxCeremony from './components/ParallaxCeremony.tsx';
import VenueInfo from './components/VenueInfo.tsx';
import RsvpSection from './components/RsvpSection.tsx';
import BlessingsWall from './components/BlessingsWall.tsx';
import Footer from './components/Footer.tsx';
import CustomizerModal from './components/CustomizerModal.tsx';
import { initialWeddingConfig, initialBlessings, parallaxCeremonies } from './data/weddingData.ts';
import { WeddingConfig, Blessing, RsvpSubmission } from './types.ts';
import { lakshmiAudioLoop } from './utils/audio.ts';

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(() => {
    try {
      const saved = localStorage.getItem('wedding_config');
      return saved ? JSON.parse(saved) : initialWeddingConfig;
    } catch {
      return initialWeddingConfig;
    }
  });

  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_blessings');
      return saved ? JSON.parse(saved) : initialBlessings;
    } catch {
      return initialBlessings;
    }
  });

  // Invitation Gate: user clicks only once at start to open
  const [hasOpenedInvitation, setHasOpenedInvitation] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Dynamic Petal Ceremony Theme tracked purely by scroll position
  const [activeTheme, setActiveTheme] = useState<CeremonyTheme>('welcome');

  // Track active section on scroll to shift flower petal colors smoothly
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      // Check each ceremony section
      for (const ceremony of parallaxCeremonies) {
        const el = document.getElementById(ceremony.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveTheme(ceremony.theme);
            return;
          }
        }
      }

      // Check venue / rsvp / reception
      const rsvpEl = document.getElementById('rsvp');
      if (rsvpEl && scrollPosition >= rsvpEl.offsetTop) {
        setActiveTheme('reception');
        return;
      }

      // Default to welcome at the top
      setActiveTheme('welcome');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When user clicks the ONLY required click: "Open Royal Invitation"
  const handleOpenInvitation = () => {
    setHasOpenedInvitation(true);
    // Play the divine 30s-50s Mahalakshmi Ashtakam loop continuously
    lakshmiAudioLoop.play();
  };

  const handleSaveConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('wedding_config', JSON.stringify(newConfig));
    } catch (e) {
      // ignore
    }
  };

  const handleAddBlessing = (newB: Blessing) => {
    const updated = [newB, ...blessings];
    setBlessings(updated);
    try {
      localStorage.setItem('wedding_blessings', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const handleRsvpSuccess = (_submission: RsvpSubmission, newBlessing?: Blessing) => {
    if (newBlessing) {
      handleAddBlessing(newBlessing);
    }
  };

  return (
    <div className="min-h-screen text-[#FAF5EE] font-sans relative selection:bg-[#D4AF37]/30 selection:text-[#FFF5DC]">
      {/* 1. Continuous Dual-Video Looping Background for the Whole Page (Completely Muted/Silent) */}
      <BackgroundVideoLoop isPlaying={hasOpenedInvitation} />

      {/* 2. Realistic Flower Petal Canvas: Starts in bulk red roses, shifts to yellow at Haldi, etc. */}
      <RealisticPetalCanvas
        currentTheme={activeTheme}
        enabled={hasOpenedInvitation}
      />

      {/* 3. Opening Royal Sealed Curtain: The ONLY click needed at start */}
      <OpeningCurtain
        config={config}
        isOpen={hasOpenedInvitation}
        onOpen={handleOpenInvitation}
      />

      {/* 4. Top Navigation Bar */}
      <Navbar
        groomName={config.groomName}
        brideName={config.brideName}
        onTriggerPetals={() => {
          // Temporarily shift to heavy vivah pushp varsha
          setActiveTheme('vivah');
          setTimeout(() => setActiveTheme('welcome'), 3500);
        }}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* 5. Main Pure Scroll Content Flow - Floating directly over continuous background video */}
      <main className="relative z-10">
        {/* Hero Invitation & Live Muhurat Countdown */}
        <Hero config={config} />

        {/* Ceremonies with Unboxed Parallax Images & Details - Appear & disappear with scroll */}
        <div className="space-y-4 lg:space-y-12">
          {parallaxCeremonies.map((ceremony, idx) => (
            <ParallaxCeremony
              key={ceremony.id}
              ceremony={ceremony}
              index={idx}
            />
          ))}
        </div>

        {/* Palace Grounds & Guest Guide */}
        <VenueInfo config={config} />

        {/* Interactive RSVP Card */}
        <RsvpSection onRsvpSuccess={handleRsvpSuccess} />

        {/* Blessings & Prayers Wall */}
        <BlessingsWall
          blessings={blessings}
          onAddBlessing={handleAddBlessing}
          onTriggerPetals={() => {
            setActiveTheme('vivah');
            setTimeout(() => setActiveTheme('welcome'), 3500);
          }}
        />
      </main>

      {/* Royal Footer */}
      <Footer
        config={config}
        onOpenCustomizer={() => setCustomizerOpen(true)}
        onTriggerPetals={() => {
          setActiveTheme('vivah');
          setTimeout(() => setActiveTheme('welcome'), 3500);
        }}
      />

      {/* Personalization Modal */}
      <CustomizerModal
        isOpen={customizerOpen}
        config={config}
        onSave={handleSaveConfig}
        onClose={() => setCustomizerOpen(false)}
      />

      {/* Floating Sound Control: Mahalakshmi Ashtakam 30s-50s Continuous Loop */}
      {hasOpenedInvitation && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => {
              const muted = lakshmiAudioLoop.toggleMute();
              setIsAudioMuted(muted);
            }}
            title={isAudioMuted ? 'Unmute Mahalakshmi Chant' : 'Mute Chant'}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#180509]/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#FFF3B0] text-xs font-serif shadow-2xl hover:bg-[#2A0910] hover:border-[#D4AF37] transition-all active:scale-95"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-[#C5B393]" />
                <span className="hidden sm:inline">Chant Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span className="hidden sm:inline">Mahalakshmi Chant (30s–50s Loop)</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
