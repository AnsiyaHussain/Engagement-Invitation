import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import PetalCanvas from './PetalCanvas';

export default function FirstMeetingSection() {
  return (
    <section
      id="portrait"
      className="section-container"
      style={{
        paddingTop: '2rem',
        paddingBottom: '3.5rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        {/* Simple & Elegant Luxury Framed Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card"
          style={{
            padding: '10px',
            borderRadius: '24px',
            backgroundColor: '#FFFFFF',
            position: 'relative',
            boxShadow: '0 16px 45px rgba(80, 55, 47, 0.1), 0 0 0 1px rgba(198, 163, 107, 0.3)',
          }}
        >
          {/* Inner Photo Container with Floating Animated Petals */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#F8F3ED',
            }}
          >
            {/* The Couple's Portrait */}
            <motion.img
              src={INVITATION_CONFIG.portraitImageSrc}
              alt={`${INVITATION_CONFIG.brideName} & ${INVITATION_CONFIG.groomName}`}
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                objectFit: 'cover',
                objectPosition: 'center 72%',
                display: 'block',
                borderRadius: '16px',
              }}
              initial={{ scale: 1.02 }}
              animate={{ scale: [1.02, 1.04, 1.02] }}
              transition={{
                repeat: Infinity,
                duration: 14,
                ease: 'easeInOut',
              }}
            />

            {/* Subtle Warm Amber Vignette / Golden Shimmer */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 30%, rgba(255, 248, 240, 0.05) 0%, rgba(80, 55, 47, 0.08) 85%, rgba(80, 55, 47, 0.18) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Fine Inner Border */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '16px',
                pointerEvents: 'none',
              }}
            />

            {/* Subtle Floating Animated Flower Petals */}
            <PetalCanvas count={14} speed={0.7} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
