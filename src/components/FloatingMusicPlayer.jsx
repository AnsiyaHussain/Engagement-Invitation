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
        bottom: '22px',
        left: '22px',
        zIndex: 50,
      }}
    >
      {/* Volume & Settings Popup */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '50px',
              left: 0,
              width: '210px',
              backgroundColor: 'rgba(255, 249, 245, 0.97)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--gold)',
              boxShadow: '0 8px 24px rgba(100, 27, 54, 0.12)',
              borderRadius: 0,
              padding: '1rem',
              color: 'var(--wine)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--gold)',
                marginBottom: '0.35rem',
              }}
            >
              MUSIC
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.88rem',
                color: 'var(--wine)',
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
                  color: 'var(--wine)',
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
                  backgroundColor: 'rgba(184, 137, 63, 0.3)',
                }}
                aria-label="Volume slider"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Music Control Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={audioState.isPlaying ? 'Pause music' : 'Play music'}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: '1px solid var(--gold)',
            backgroundColor: 'rgba(255, 249, 245, 0.92)',
            backdropFilter: 'blur(6px)',
            color: 'var(--wine)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            outline: 'none',
            boxShadow: '0 4px 16px rgba(100, 27, 54, 0.08)',
          }}
        >
          {audioState.isPlaying ? (
            <Pause size={15} style={{ color: 'var(--wine)' }} />
          ) : (
            <Play size={15} style={{ color: 'var(--wine)', marginLeft: '2px' }} />
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
            border: '1px solid var(--gold)',
            backgroundColor: 'rgba(255, 249, 245, 0.92)',
            backdropFilter: 'blur(6px)',
            color: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            boxShadow: '0 2px 8px rgba(100, 27, 54, 0.06)',
          }}
        >
          <SlidersHorizontal size={11} />
        </button>
      </div>
    </div>
  );
}
