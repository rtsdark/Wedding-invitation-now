import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, ArrowRight } from 'lucide-react';
import { weddingVideos } from '../data/weddingData.ts';

interface VideoTheaterProps {
  onCeremoniesClick?: () => void;
}

export default function VideoTheater({ onCeremoniesClick }: VideoTheaterProps) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [floatingMinimized, setFloatingMinimized] = useState(false);

  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const floatingVideoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentVideo = weddingVideos[activeVideoIdx];

  // Detect when scrolled past the main theater to enable floating mini-theater
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Scrolled past when top is far above viewport
      const scrolledPast = rect.bottom < 120;
      setIsScrolledPast(scrolledPast);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (!mainVideoRef.current) return;
    if (isPlaying) {
      mainVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      mainVideoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!mainVideoRef.current) return;
    const newMuted = !isMuted;
    mainVideoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleFullscreen = () => {
    if (!mainVideoRef.current) return;
    if (mainVideoRef.current.requestFullscreen) {
      mainVideoRef.current.requestFullscreen();
    }
  };

  const switchVideo = (index: number) => {
    setActiveVideoIdx(index);
    setIsPlaying(true);
    // Restart video
    setTimeout(() => {
      if (mainVideoRef.current) {
        mainVideoRef.current.currentTime = 0;
        mainVideoRef.current.play();
      }
    }, 50);
  };

  return (
    <>
      <section
        id="cinematic-reel"
        ref={containerRef}
        className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#100305]"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
              Visual Splendor &amp; Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF5EE]">
              The Royal Cinematic Visuals
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#D1C2A5] font-serif leading-relaxed">
              Witness the majesty of the ceremonial floral Rath and the ethereal entry of the royal bride, captured in cinematic glory.
            </p>
          </div>

          {/* Video Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {weddingVideos.map((vid, idx) => (
              <button
                key={vid.id}
                onClick={() => switchVideo(idx)}
                className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeVideoIdx === idx
                    ? 'bg-[#3A0F17] text-[#FFF3B0] border border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-[#1D060B] text-[#B8A78F] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FAF5EE]'
                }`}
              >
                <Film className={`w-4 h-4 ${activeVideoIdx === idx ? 'text-[#D4AF37]' : 'text-[#8C7A62]'}`} />
                <span className="font-serif tracking-wider">{vid.title}</span>
              </button>
            ))}
          </div>

          {/* Main Wide Cinema Screen */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.15)] bg-black group">
            {/* The Video on Loop */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <video
                ref={mainVideoRef}
                key={currentVideo.src}
                src={currentVideo.src}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover select-none"
              />

              {/* Ambient gradient scrim at bottom for controls legibility */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Top info badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-serif text-[#FFF3B0]">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="tracking-wide">{currentVideo.category}</span>
                </div>
                {isMuted && (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-[#E5D7BF]">
                    <span>Sound Available (Click Unmute)</span>
                  </div>
                )}
              </div>

              {/* Overlay Controls */}
              <div className="absolute inset-x-0 bottom-4 px-4 sm:px-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-[#D4AF37] text-[#140508] hover:bg-[#FFF3B0] transition-colors shadow-lg active:scale-95"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border backdrop-blur-md transition-all ${
                      isMuted
                        ? 'bg-black/60 text-[#FAF5EE] border-white/20 hover:border-[#D4AF37]'
                        : 'bg-[#D4AF37]/30 text-[#FFF3B0] border-[#D4AF37]'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
                    <span>{isMuted ? 'Unmute Audio' : 'Muted'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden md:block text-right">
                    <p className="text-xs font-serif text-[#FFF3B0]">{currentVideo.title}</p>
                    <p className="text-[11px] text-[#A69376]">{currentVideo.subtitle}</p>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="p-2.5 rounded-xl bg-black/60 text-[#FAF5EE] hover:text-[#D4AF37] border border-white/20 hover:border-[#D4AF37] transition-colors"
                    aria-label="Fullscreen view"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick link to programmes */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 rounded-xl bg-[#1C070B]/70 border border-[#D4AF37]/25">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-lg bg-[#2D0A11] border border-[#D4AF37]/40 text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-semibold text-[#FAF5EE]">
                  The Wedding Itinerary &amp; Ceremonies
                </h4>
                <p className="text-xs text-[#BFA888]">
                  Explore Mangal Haldi, Rang-e-Mehndi, Sangeet Night, Shahi Baraat, and Shubh Vivah.
                </p>
              </div>
            </div>
            <a
              href="#programmes"
              onClick={onCeremoniesClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-[#140508] bg-gradient-to-r from-[#D4AF37] to-[#F7CC64] hover:brightness-110 active:scale-98 transition-all shrink-0"
            >
              <span>Explore Ceremonies</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FLOATING MINI-THEATER: Keeps the wide looping video visible as scrolling happens! */}
      {isScrolledPast && (
        <aside
          aria-label="Floating video player"
          className={`fixed bottom-5 right-5 z-40 transition-all duration-300 ${
            floatingMinimized ? 'w-48' : 'w-72 sm:w-84'
          }`}
        >
          <div className="rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-[#140508] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.25)]">
            {/* Header bar of floating player */}
            <div className="px-3 py-1.5 bg-[#25080E] border-b border-[#D4AF37]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-serif font-medium truncate">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="truncate">{currentVideo.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFloatingMinimized(!floatingMinimized)}
                  className="text-[#B8A78F] hover:text-[#FAF5EE] px-1 text-xs"
                  title={floatingMinimized ? 'Expand video' : 'Minimize video'}
                >
                  {floatingMinimized ? '▲' : '▼'}
                </button>
              </div>
            </div>

            {!floatingMinimized && (
              <div className="relative aspect-video bg-black">
                <video
                  ref={floatingVideoRef}
                  key={`floating-${currentVideo.src}`}
                  src={currentVideo.src}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Quick overlay buttons */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => switchVideo((activeVideoIdx + 1) % weddingVideos.length)}
                    className="px-2 py-1 rounded bg-black/70 text-[#FFF3B0] border border-[#D4AF37]/40 hover:bg-[#25080E] transition-colors"
                  >
                    Next Reel ↻
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded bg-black/70 text-[#FAF5EE] hover:text-[#D4AF37] border border-white/20 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
