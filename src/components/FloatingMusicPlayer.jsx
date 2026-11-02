import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SlidersHorizontal } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function FloatingMusicPlayer() {
  const [audioState, setAudioState] = useState({
    isPlaying: audioManager.isPlaying,
    isMuted: audioManager.isMuted,
    volume: audioManager.volume,
    mode: audioManager.mode,
  });
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe(newState => {
      setAudioState(newState);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    audioManager.toggle(INVITATION_CONFIG.music.audioSrc);
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    audioManager.toggleMute();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    audioManager.setVolume(val);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 900,
      }}
    >
      {/* Volume & Settings Popup (Minimal Outlined Panel) */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '54px',
              right: 0,
              width: '200px',
              backgroundColor: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 0,
              padding: '1rem',
              color: 'var(--ink)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--gold)',
                marginBottom: '0.4rem',
              }}
            >
              MUSIC
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.92rem',
                color: 'var(--ink)',
                marginBottom: '0.8rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {INVITATION_CONFIG.music.trackTitle}
            </div>

            {/* Volume Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handleToggleMute}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
                aria-label={audioState.isMuted ? 'Unmute' : 'Mute'}
              >
                {audioState.isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioState.volume}
                onChange={handleVolumeChange}
                style={{
                  flex: 1,
                  accentColor: 'var(--gold)',
                  cursor: 'pointer',
                  height: '2px',
                  backgroundColor: 'var(--line)',
                }}
                aria-label="Volume slider"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Music Control: Small Outlined Circle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={audioState.isPlaying ? 'Pause music' : 'Play music'}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '1px solid var(--line)',
            backgroundColor: 'var(--paper)',
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.25s ease, background-color 0.25s ease',
            outline: 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--line)'}
        >
          {audioState.isPlaying ? (
            <Pause size={15} style={{ color: 'var(--ink)' }} />
          ) : (
            <Play size={15} style={{ color: 'var(--ink)', marginLeft: '2px' }} />
          )}
        </button>

        {/* Small settings toggle dot */}
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          aria-label="Toggle music volume slider"
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            border: '1px solid var(--line)',
            backgroundColor: 'var(--paper)',
            color: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <SlidersHorizontal size={12} />
        </button>
      </div>
    </div>
  );
}
