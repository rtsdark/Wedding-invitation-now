/**
 * Divine Mahalakshmi Ashtakam 20-Second Audio Loop Engine (30s - 50s)
 * Plays the sacred choir chant:
 * "Namasthe Garudaaroodhe Kolaasura Bhayankari... Sarva Paapa Hare Devi Mahalakshmi Namosthuthe"
 * on continuous loop.
 */

class LakshmiAudioLoopManager {
  private audio: HTMLAudioElement | null = null;
  private isAudioPlaying = false;
  private isAudioMuted = false;
  private fallbackInterval: any = null;

  // The 20s extracted loop file and original full track
  private loopSrc = '/assets/aistudio/lakshmi_ashtakam_30_50_loop.mp3';
  private fullSrc =
    '/assets/aistudio/ytmp3free.cc_lakshmi-ashtakam-official-lyric-video-participants-of-south-india-female-choir-divine-chants-youtubemp3free.org_73dfd87f.mp3';

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    this.audio = new Audio(this.loopSrc);
    this.audio.loop = true;
    this.audio.preload = 'auto';

    // Fallback error handler: if the 20s file fails for any reason, load the full file and cycle 30s-50s
    this.audio.onerror = () => {
      if (!this.audio) return;
      this.audio.src = this.fullSrc;
      this.audio.loop = false;
      this.audio.currentTime = 30;

      if (this.fallbackInterval) clearInterval(this.fallbackInterval);
      this.fallbackInterval = setInterval(() => {
        if (!this.audio) return;
        if (this.audio.currentTime >= 50 || this.audio.currentTime < 30) {
          this.audio.currentTime = 30;
        }
      }, 250);
    };
  }

  public play() {
    this.initAudio();
    if (!this.audio) return;

    this.audio.muted = this.isAudioMuted;
    this.audio
      .play()
      .then(() => {
        this.isAudioPlaying = true;
      })
      .catch((err) => {
        console.warn('Audio playback deferred until user interaction:', err);
      });
  }

  public pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isAudioPlaying = false;
  }

  public toggle(): boolean {
    if (this.isAudioPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public toggleMute(): boolean {
    if (!this.audio) return false;
    this.isAudioMuted = !this.isAudioMuted;
    this.audio.muted = this.isAudioMuted;
    return this.isAudioMuted;
  }

  public setMuted(muted: boolean) {
    this.isAudioMuted = muted;
    if (this.audio) {
      this.audio.muted = muted;
    }
  }

  public isPlaying(): boolean {
    return this.isAudioPlaying;
  }

  public isMuted(): boolean {
    return this.isAudioMuted;
  }
}

export const lakshmiAudioLoop = new LakshmiAudioLoopManager();
