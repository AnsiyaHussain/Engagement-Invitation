import { motion } from 'framer-motion';
import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import PetalCanvas from './PetalCanvas';

export default function ClosingSection() {
  const { closing, brideName, groomName } = INVITATION_CONFIG;

  return (
    <footer
      id="closing"
      className="section-container"
      style={{
        textAlign: 'center',
        position: 'relative',
        backgroundColor: 'rgba(244, 236, 225, 0.45)',
        borderTop: '1px solid rgba(198, 163, 107, 0.3)',
        paddingBottom: '6rem',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Petals Canvas Layer for romantic conclusion */}
      <PetalCanvas count={12} speed={0.6} />

      <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative', zIndex: 12 }}>
        {/* Decorative Golden Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            position: 'relative',
          }}
        >
          <img
            src="/images/wax-seal.jpg"
            alt="Wax Seal Monogram"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              boxShadow: '0 6px 20px rgba(198, 163, 107, 0.35)',
              border: '1px solid rgba(198, 163, 107, 0.5)',
            }}
          />
        </motion.div>

        {/* Emotion Closing Callout */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.85rem',
            lineHeight: 1.3,
            color: 'var(--color-espresso)',
            marginBottom: '1rem',
          }}
        >
          "{closing.title}"
        </motion.h2>

        <div className="gold-divider" style={{ margin: '1.2rem auto' }}>
          <Sparkles size={15} className="gold-divider-icon" />
        </div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ margin: '1.2rem 0' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              fontWeight: 600,
              color: 'var(--color-espresso)',
              letterSpacing: '0.04em',
            }}
          >
            <span>{brideName}</span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-script)',
                fontSize: '1.9rem',
                color: 'var(--color-antique-gold)',
                margin: '0.1rem 0',
                fontWeight: 400,
              }}
            >
              &
            </span>
            <span>{groomName}</span>
          </h3>
        </motion.div>

        {/* Final Date & Time Marker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'inline-block',
            margin: '1rem auto 1.5rem',
            padding: '0.65rem 1.6rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            border: '1px solid rgba(198, 163, 107, 0.45)',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--color-espresso)',
            }}
          >
            {closing.dateSummary}
          </span>
        </motion.div>

        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--color-espresso-light)',
            letterSpacing: '0.03em',
            maxWidth: '320px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          {closing.farewell}
        </p>

        {/* Heart icon finale */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', opacity: 0.6 }}>
          <span style={{ height: '1px', width: '30px', background: 'var(--color-antique-gold)' }} />
          <Heart size={14} style={{ color: 'var(--color-antique-gold)', fill: 'var(--color-antique-gold)' }} />
          <span style={{ height: '1px', width: '30px', background: 'var(--color-antique-gold)' }} />
        </div>
      </div>
    </footer>
  );
}
