import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { audioManager } from '../utils/audioManager';

export default function OpeningScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio starts strictly after visitor taps to open
    try {
      audioManager.play(INVITATION_CONFIG.music.audioSrc);
    } catch {
      // Audio playback fallback
    }

    // Complete the 1.9s cubic-bezier door opening transition before unmounting
    setTimeout(() => {
      onOpen();
    }, 1950);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      id="opening-screen-container"
      role="dialog"
      aria-modal="true"
      aria-label="Invitation opening screen for Ansiya and Nihal"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        overflow: 'hidden',
        backgroundColor: 'var(--ivory)',
        cursor: isOpening ? 'default' : 'pointer',
      }}
      onClick={handleOpen}
    >
      {/* Left Paper Door Panel */}
      <motion.div
        initial={false}
        animate={isOpening ? { x: '-100%' } : { x: '0%' }}
        transition={{
          duration: 1.9,
          ease: [0.77, 0, 0.175, 1],
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50.5%', // 0.5% overlap prevents hairline gap on mobile sub-pixel rendering
          height: '100%',
          backgroundColor: 'var(--paper)',
          borderRight: '1px solid var(--line)',
          zIndex: 10,
        }}
      />

      {/* Right Paper Door Panel */}
      <motion.div
        initial={false}
        animate={isOpening ? { x: '100%' } : { x: '0%' }}
        transition={{
          duration: 1.9,
          ease: [0.77, 0, 0.175, 1],
        }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50.5%',
          height: '100%',
          backgroundColor: 'var(--paper)',
          borderLeft: '1px solid var(--line)',
          zIndex: 10,
        }}
      />

      {/* Centred 132px Gold Outlined Circle with A & N Monogram */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.45, ease: 'easeOut' } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 132px Gold Outlined Circle */}
            <div
              className="breathing-monogram"
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label="A & N Monogram. Tap to open invitation"
              style={{
                width: '132px',
                height: '132px',
                borderRadius: '50%',
                border: '1px solid var(--gold)',
                backgroundColor: 'var(--paper)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
              }}
            >
              {/* Monogram Letters */}
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.3rem',
                  fontWeight: 300,
                  color: 'var(--ink)',
                  lineHeight: 1,
                  letterSpacing: '0.06em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span>A</span>
                <span
                  style={{
                    color: 'var(--gold)',
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 300,
                    fontSize: '1.9rem',
                    margin: '0 0.2rem',
                  }}
                >
                  &
                </span>
                <span>N</span>
              </div>
            </div>

            {/* Small TAP TO OPEN prompt text */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                color: 'var(--ink)',
                marginTop: '1.4rem',
                fontWeight: 400,
              }}
            >
              TAP TO OPEN
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
