import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function ClosingSection() {
  const { closing, brideName, groomName } = INVITATION_CONFIG;

  return (
    <footer
      id="closing"
      className="section-container"
      style={{
        textAlign: 'center',
        position: 'relative',
        backgroundColor: 'var(--ivory)',
        borderTop: '1px solid var(--line)',
        paddingTop: '4.5rem',
        paddingBottom: '5.5rem',
      }}
    >
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        {/* Paper Panel */}
        <motion.div
          className="paper-panel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            border: '1px solid var(--line)',
            backgroundColor: 'var(--paper)',
            padding: '3rem 1.8rem 2.8rem',
            textAlign: 'center',
          }}
        >
          {/* Header */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              marginBottom: '1.2rem',
            }}
          >
            WITH LOVE & GRATITUDE
          </p>

          {/* Couple Names */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 6.5vw, 3.2rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              margin: '0 0 0.8rem',
            }}
          >
            <span>{brideName}</span>
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--gold)',
                margin: '0 0.4rem',
                fontSize: '0.9em',
              }}
            >
              &
            </span>
            <span>{groomName}</span>
          </h2>

          <div className="hairline" style={{ maxWidth: '100px', margin: '1.4rem auto' }} />

          {/* Date Summary */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--gold)',
              marginBottom: '1.2rem',
            }}
          >
            {closing.dateSummary}
          </p>

          {/* Personal Farewell */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '1.08rem',
              color: 'var(--ink)',
              lineHeight: 1.7,
              maxWidth: '380px',
              margin: '0 auto',
            }}
          >
            "{closing.farewell}"
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
