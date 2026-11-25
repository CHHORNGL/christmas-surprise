import { useCallback, useEffect, useRef, useState } from 'react';
import { FIRST_SCREEN_COPY, SURPRISE_MESSAGE } from './christmasMessage.js';
import CelebrationEffects from './components/CelebrationEffects.jsx';
import ChristmasCharacter from './components/ChristmasCharacter.jsx';
import ChristmasTree from './components/ChristmasTree.jsx';
import GiftBox from './components/GiftBox.jsx';
import Snowfall from './components/Snowfall.jsx';

// Gentle holiday music-box melody ("We Wish You a Merry Christmas" warm chime)
const HOLIDAY_CHIMES = [
  { freq: 392.0, dur: 0.42 }, // G4
  { freq: 523.25, dur: 0.42 }, // C5
  { freq: 523.25, dur: 0.24 }, // C5
  { freq: 587.33, dur: 0.24 }, // D5
  { freq: 523.25, dur: 0.24 }, // C5
  { freq: 493.88, dur: 0.24 }, // B4
  { freq: 440.0, dur: 0.42 }, // A4
  { freq: 440.0, dur: 0.42 }, // A4
  { freq: 440.0, dur: 0.42 }, // A4
  { freq: 587.33, dur: 0.42 }, // D5
  { freq: 587.33, dur: 0.24 }, // D5
  { freq: 659.25, dur: 0.24 }, // E5
  { freq: 587.33, dur: 0.24 }, // D5
  { freq: 523.25, dur: 0.24 }, // C5
  { freq: 493.88, dur: 0.42 }, // B4
  { freq: 392.0, dur: 0.42 }, // G4
  { freq: 392.0, dur: 0.42 }, // G4
  { freq: 659.25, dur: 0.42 }, // E5
  { freq: 659.25, dur: 0.24 }, // E5
  { freq: 698.46, dur: 0.24 }, // F5
  { freq: 659.25, dur: 0.24 }, // E5
  { freq: 587.33, dur: 0.24 }, // D5
  { freq: 523.25, dur: 0.42 }, // C5
  { freq: 440.0, dur: 0.42 }, // A4
  { freq: 392.0, dur: 0.24 }, // G4
  { freq: 392.0, dur: 0.24 }, // G4
  { freq: 440.0, dur: 0.42 }, // A4
  { freq: 587.33, dur: 0.42 }, // D5
  { freq: 493.88, dur: 0.42 }, // B4
  { freq: 523.25, dur: 0.85 }, // C5
];

function App() {
  // 'intro' -> 'opening' -> 'celebration'
  const [stage, setStage] = useState('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const stageTimerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const noteTimerRef = useRef(null);
  const noteIndexRef = useRef(0);

  const stopMusic = useCallback(() => {
    if (noteTimerRef.current) {
      window.clearTimeout(noteTimerRef.current);
      noteTimerRef.current = null;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      try {
        const now = audioCtxRef.current.currentTime;
        masterGainRef.current.gain.cancelScheduledValues(now);
        masterGainRef.current.gain.setTargetAtTime(0.0001, now, 0.08);
      } catch {
        // Ignore audio cleanup issues
      }
    }
    setIsMusicPlaying(false);
  }, []);

  const scheduleNextChime = useCallback(() => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;

    const note = HOLIDAY_CHIMES[noteIndexRef.current % HOLIDAY_CHIMES.length];
    noteIndexRef.current += 1;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const shimmer = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const shimmerGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now);

      shimmer.type = 'triangle';
      shimmer.frequency.setValueAtTime(note.freq * 2, now);
      shimmerGain.gain.setValueAtTime(0.15, now);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.24, now + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + note.dur * 1.3);

      osc.connect(noteGain);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      shimmer.start(now);
      osc.stop(now + note.dur * 1.4);
      shimmer.stop(now + note.dur * 1.4);
    } catch {
      // Ignore transient Web Audio issues
    }

    noteTimerRef.current = window.setTimeout(
      scheduleNextChime,
      note.dur * 1000
    );
  }, []);

  const startMusic = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
        masterGainRef.current = audioCtxRef.current.createGain();
        masterGainRef.current.gain.setValueAtTime(
          0.2,
          audioCtxRef.current.currentTime
        );
        masterGainRef.current.connect(audioCtxRef.current.destination);
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      if (masterGainRef.current) {
        const now = ctx.currentTime;
        masterGainRef.current.gain.cancelScheduledValues(now);
        masterGainRef.current.gain.setTargetAtTime(0.2, now, 0.08);
      }

      if (noteTimerRef.current) {
        window.clearTimeout(noteTimerRef.current);
      }

      noteIndexRef.current = 0;
      setIsMusicPlaying(true);
      scheduleNextChime();
    } catch {
      setIsMusicPlaying(false);
    }
  }, [scheduleNextChime]);

  useEffect(() => {
    return () => {
      if (stageTimerRef.current) window.clearTimeout(stageTimerRef.current);
      if (noteTimerRef.current) window.clearTimeout(noteTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  const handleOpenGift = () => {
    if (stageTimerRef.current) {
      window.clearTimeout(stageTimerRef.current);
    }
    setStage('opening');
    startMusic();

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    stageTimerRef.current = window.setTimeout(
      () => {
        setStage('celebration');
      },
      prefersReducedMotion ? 150 : 1450
    );
  };

  const handleReplay = () => {
    if (stageTimerRef.current) {
      window.clearTimeout(stageTimerRef.current);
    }
    setStage('intro');
  };

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  return (
    <div className="christmas-shell">
      <Snowfall />
      {stage !== 'intro' && <CelebrationEffects />}

      {/* Decorative Top Fairy Lights Garland */}
      <div className="top-garland" aria-hidden="true">
        <span className="garland-bulb bulb-red" />
        <span className="garland-bulb bulb-gold" />
        <span className="garland-bulb bulb-green" />
        <span className="garland-bulb bulb-pink" />
        <span className="garland-bulb bulb-gold" />
        <span className="garland-bulb bulb-red" />
        <span className="garland-bulb bulb-green" />
        <span className="garland-bulb bulb-pink" />
      </div>

      <main className="christmas-stage">
        {stage === 'intro' && (
          <section className="intro-card" aria-label="Christmas greeting">
            <div className="scene-duo">
              <ChristmasCharacter />
              <ChristmasTree />
            </div>

            <h1 className="hero-title">{FIRST_SCREEN_COPY.heading}</h1>
            <p className="hero-subtitle">{FIRST_SCREEN_COPY.subtitle}</p>

            <button
              type="button"
              className="btn btn-gift"
              onClick={handleOpenGift}
            >
              {FIRST_SCREEN_COPY.buttonText}
            </button>
          </section>
        )}

        {stage === 'opening' && (
          <section
            className="opening-card"
            aria-live="polite"
            aria-label="Opening your Christmas gift"
          >
            <GiftBox isOpen={false} size="large" />
            <p className="opening-caption">Unwrapping your Christmas surprise...</p>
          </section>
        )}

        {stage === 'celebration' && (
          <section
            className="celebration-view"
            aria-live="polite"
            aria-label="Christmas celebration message"
          >
            <div className="celebration-header">
              <ChristmasCharacter celebrate />
              <GiftBox isOpen size="small" />
              <ChristmasTree celebrate />
            </div>

            <article className="letter-card">
              <div className="letter-badge" aria-hidden="true">
                🎄 ❄️ ❤️
              </div>
              <h1 className="letter-title">{SURPRISE_MESSAGE.title}</h1>
              <div className="letter-body">
                {SURPRISE_MESSAGE.paragraphs.map((paragraph, index) => (
                  <p key={index} className="letter-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <div className="celebration-controls">
              <button
                type="button"
                className={`btn btn-secondary ${isMusicPlaying ? 'is-playing' : ''}`}
                onClick={handleToggleMusic}
                aria-pressed={isMusicPlaying}
              >
                {isMusicPlaying ? 'Pause Holiday Chime 🎶' : 'Play Holiday Chime 🔔'}
              </button>

              <button
                type="button"
                className="btn btn-cream"
                onClick={handleReplay}
              >
                Replay Surprise 🎁
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
