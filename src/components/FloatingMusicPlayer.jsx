import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function FloatingMusicPlayer() {
  const [audioState, setAudioState] = useState({
    isPlaying: audioManager.isPlaying,
    isMuted: audioManager.isMuted,
    volume: audioManager.volume,
    mode: audioManager.mode,
  });
  const [isExpanded, setIsExpanded] = useState(false);

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
        bottom: '20px',
        right: '20px',
        zIndex: 900,
      }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              bottom: '56px',
              right: 0,
              width: '210px',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              border: '1px solid rgba(198, 163, 107, 0.4)',
              boxShadow: '0 12px 30px rgba(80, 55, 47, 0.15)',
              padding: '1rem',
              color: 'var(--color-espresso)',
            }}
          >
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-antique-gold)', fontWeight: 600, marginBottom: '0.3rem' }}>
              Background Music
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-espresso)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {INVITATION_CONFIG.music.trackTitle}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', marginBottom: '0.8rem' }}>
              {audioState.mode === 'synth' ? 'Romantic Acoustic Chords' : INVITATION_CONFIG.music.artist || 'Instrumental Melody'}
            </div>

            {/* Volume Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={handleToggleMute}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-espresso)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
                aria-label="Toggle mute"
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
                  accentColor: 'var(--color-antique-gold)',
                  cursor: 'pointer',
                  height: '4px',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.div
        className="floating-music-pill"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(198, 163, 107, 0.45)',
          borderRadius: '999px',
          padding: '0.45rem 0.85rem 0.45rem 0.6rem',
          boxShadow: '0 8px 24px rgba(80, 55, 47, 0.12)',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={handleTogglePlay}
      >
        {/* Play/Pause / Disc Indicator */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: audioState.isPlaying ? 'var(--color-espresso)' : 'var(--color-champagne)',
            color: audioState.isPlaying ? '#FFFFFF' : 'var(--color-espresso)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s ease',
          }}
        >
          {audioState.isPlaying ? (
            <Pause size={13} />
          ) : (
            <Play size={13} style={{ marginLeft: '1px' }} />
          )}
        </div>

        {/* Animated Sound Bars or Status Text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {audioState.isPlaying && !audioState.isMuted ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
              <span className="sound-bar" style={{ animation: 'soundWave 0.8s ease-in-out infinite' }} />
              <span className="sound-bar" style={{ animation: 'soundWave 1.1s ease-in-out 0.2s infinite' }} />
              <span className="sound-bar" style={{ animation: 'soundWave 0.9s ease-in-out 0.4s infinite' }} />
            </div>
          ) : (
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-espresso-light)' }}>
              {audioState.isMuted ? 'Muted' : 'Music'}
            </span>
          )}

          {/* Quick Expand Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: '0 2px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--color-antique-gold)',
              cursor: 'pointer',
            }}
            aria-label="Toggle music settings"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </motion.div>

      {/* Sound Bar CSS Keyframe Animation */}
      <style>{`
        .sound-bar {
          width: 2px;
          height: 100%;
          background-color: var(--color-antique-gold);
          border-radius: 2px;
          transform-origin: bottom;
        }
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
      `}</style>
    </div>
  );
}
