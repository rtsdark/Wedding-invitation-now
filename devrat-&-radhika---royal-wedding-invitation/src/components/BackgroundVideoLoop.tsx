import { useState, useRef, useEffect } from 'react';

interface BackgroundVideoLoopProps {
  isPlaying: boolean;
}

export default function BackgroundVideoLoop({ isPlaying }: BackgroundVideoLoopProps) {
  // Video 1: Grand Baraat Rath traversing towards mandap
  // Video 2: Royal Bride entering mandap with dancers and petal shower
  const video1Src = '/assets/aistudio/Bridegroom_rath_traversing_weddi__de7461c0_203fc5be.mp4';
  const video2Src = '/assets/aistudio/Bride_entering_wedding_mandap_71f462a2_2e6f888b.mp4';

  const [currentVideoIdx, setCurrentVideoIdx] = useState<0 | 1>(0);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  // Crossfade transition when video ends
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    if (!v1 || !v2) return;

    // Both videos strictly muted
    v1.muted = true;
    v2.muted = true;

    const handleV1Ended = () => {
      setCurrentVideoIdx(1);
      v2.currentTime = 0;
      v2.play().catch(() => {});
    };

    const handleV2Ended = () => {
      setCurrentVideoIdx(0);
      v1.currentTime = 0;
      v1.play().catch(() => {});
    };

    v1.addEventListener('ended', handleV1Ended);
    v2.addEventListener('ended', handleV2Ended);

    return () => {
      v1.removeEventListener('ended', handleV1Ended);
      v2.removeEventListener('ended', handleV2Ended);
    };
  }, []);

  // Sync play/pause with parent
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    v1.muted = true;
    v2.muted = true;

    if (isPlaying) {
      if (currentVideoIdx === 0) {
        v1.play().catch(() => {});
      } else {
        v2.play().catch(() => {});
      }
    } else {
      v1.pause();
      v2.pause();
    }
  }, [isPlaying, currentVideoIdx]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-[#0A0204]">
      {/* Video 1: Rath traversing towards mandap (100% silent) */}
      <video
        ref={video1Ref}
        src={video1Src}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          currentVideoIdx === 0 ? 'opacity-90' : 'opacity-0'
        }`}
      />

      {/* Video 2: Royal Bride entering mandap (100% silent) */}
      <video
        ref={video2Ref}
        src={video2Src}
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          currentVideoIdx === 1 ? 'opacity-90' : 'opacity-0'
        }`}
      />

      {/* Cinematic Royal Scrims & Gold Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0306]/85 via-[#0A0204]/60 to-[#0F0306]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(10,2,4,0.75)_100%)]" />
    </div>
  );
}
