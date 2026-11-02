import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { audioManager } from '../utils/audioManager';

export default function OpeningScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Start background music strictly after user interaction
    audioManager.play(INVITATION_CONFIG.music.audioSrc);

    // Allow the opening animation to play smoothly before revealing main site
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="opening-screen-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          backgroundColor: 'var(--color-warm-ivory)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.9) 0%, rgba(248,243,237,0.95) 70%, #E8D8C6 100%)',
        }}
      >
        <motion.div
          className="opening-envelope-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={isOpening ? { scale: 1.05, opacity: 0, y: -60 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '420px',
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(198, 163, 107, 0.45)',
            boxShadow: '0 20px 60px rgba(80, 55, 47, 0.12), 0 0 0 1px rgba(198, 163, 107, 0.15)',
            padding: '3rem 2rem 2.8rem',
            position: 'relative',
          }}
        >
          {/* Decorative Corner Filigrees */}
          <div style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--color-antique-gold)', opacity: 0.5, fontSize: '1.2rem' }}>✦</div>
          <div style={{ position: 'absolute', top: '14px', right: '16px', color: 'var(--color-antique-gold)', opacity: 0.5, fontSize: '1.2rem' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '14px', left: '16px', color: 'var(--color-antique-gold)', opacity: 0.5, fontSize: '1.2rem' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '14px', right: '16px', color: 'var(--color-antique-gold)', opacity: 0.5, fontSize: '1.2rem' }}>✦</div>

          {/* Subtitle Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ marginBottom: '1.25rem' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--color-espresso-light)',
                fontWeight: 500,
                display: 'inline-block'
              }}
            >
              Engagement Invitation
            </span>
            <div className="gold-divider" style={{ margin: '0.8rem auto', maxWidth: '140px' }}>
              <Heart size={14} className="gold-divider-icon" />
            </div>
          </motion.div>

          {/* Core Opening Text */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.65rem',
              fontWeight: 400,
              lineHeight: 1.35,
              color: 'var(--color-espresso)',
              marginBottom: '1rem',
              fontStyle: 'italic'
            }}
          >
            "{INVITATION_CONFIG.subTitle}"
          </motion.h2>

          {/* Couple's Names as Editable Placeholders */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{ margin: '1.4rem 0 2rem' }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.25rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                lineHeight: 1.2,
                color: 'var(--color-espresso)',
              }}
            >
              <span>{INVITATION_CONFIG.brideName}</span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.85rem',
                  color: 'var(--color-antique-gold)',
                  margin: '0.1rem 0',
                  fontWeight: 400
                }}
              >
                &
              </span>
              <span>{INVITATION_CONFIG.groomName}</span>
            </h1>
          </motion.div>

          {/* Luxury Wax Seal Accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{
              width: '84px',
              height: '84px',
              margin: '0 auto 2.2rem',
              position: 'relative',
            }}
          >
            <img
              src="/images/wax-seal.jpg"
              alt="Antique Gold Wax Seal"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0 8px 24px rgba(198, 163, 107, 0.45)',
                border: '1px solid rgba(198, 163, 107, 0.6)'
              }}
            />
            {/* Subtle rotating glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: '50%',
                border: '1px dashed rgba(198, 163, 107, 0.4)',
                pointerEvents: 'none'
              }}
            />
          </motion.div>

          {/* Open Invitation Button */}
          <motion.button
            id="open-invitation-btn"
            onClick={handleOpenClick}
            disabled={isOpening}
            className="btn-luxury"
            style={{ width: '100%', position: 'relative', overflow: 'hidden' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Sparkles size={16} style={{ color: 'var(--color-antique-gold)' }} />
            <span>{isOpening ? 'Unfolding Invitation...' : 'Open Our Invitation'}</span>
          </motion.button>

          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-espresso-light)',
              marginTop: '1.2rem',
              letterSpacing: '0.04em',
              opacity: 0.8
            }}
          >
            Tap to open & play music
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
