import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import CountdownSection from './CountdownSection';

export default function AnnouncementSection() {
  const {
    blessingHeader,
    brideName,
    groomName,
    personalMessage,
    invitationCallout,
    dateDisplay,
    timeDisplay,
  } = INVITATION_CONFIG;

  // Motion variants for delicate editorial sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="announcement"
      className="section-container"
      style={{
        textAlign: 'center',
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        backgroundColor: 'var(--ivory)',
      }}
    >
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        {/* Main Minimal Outlined Paper Panel */}
        <motion.div
          className="paper-panel"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            border: '1px solid var(--line)',
            backgroundColor: 'var(--paper)',
            padding: '3.2rem 1.8rem 2.8rem',
            textAlign: 'center',
          }}
        >
          {/* Header Callout */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.74rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.24em',
              color: 'var(--ink)',
              margin: '0 0 1.6rem',
              opacity: 0.9,
            }}
          >
            {blessingHeader}
          </motion.p>

          <motion.div variants={itemVariants} className="hairline" style={{ maxWidth: '60px', margin: '1rem auto 2.2rem' }} />

          {/* Bride Name */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.75rem, 8.5vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            {brideName}
          </motion.h1>

          {/* "and" Ampersand / Text */}
          <motion.div
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '1.85rem',
              color: 'var(--gold)',
              margin: '0.35rem 0',
              lineHeight: 1,
            }}
          >
            and
          </motion.div>

          {/* Groom Name */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.75rem, 8.5vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              color: 'var(--ink)',
              margin: '0 0 2rem',
            }}
          >
            {groomName}
          </motion.h1>

          {/* Prominent Personal Invitation Message */}
          <motion.div
            variants={itemVariants}
            style={{
              maxWidth: '430px',
              margin: '0 auto 2.2rem',
              padding: '0 0.5rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.18rem, 3.6vw, 1.45rem)',
                lineHeight: 1.7,
                color: 'var(--ink)',
                margin: 0,
                textAlign: 'center',
              }}
            >
              "{personalMessage}"
            </p>
          </motion.div>

          {/* Hairline Divider */}
          <motion.div variants={itemVariants} className="hairline" style={{ maxWidth: '140px', margin: '1.8rem auto' }} />

          {/* Formal Invitation Text */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--ink)',
              lineHeight: 1.6,
              maxWidth: '380px',
              margin: '0 auto 1.8rem',
            }}
          >
            {invitationCallout}
          </motion.p>

          {/* Date */}
          <motion.div
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 5vw, 2.15rem)',
              fontWeight: 400,
              letterSpacing: '0.03em',
              color: 'var(--ink)',
              marginBottom: '0.35rem',
            }}
          >
            {dateDisplay}
          </motion.div>

          {/* Time */}
          <motion.div
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 400,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '2.5rem',
            }}
          >
            {timeDisplay}
          </motion.div>

          {/* Hairline Divider Above Countdown */}
          <motion.div variants={itemVariants} className="hairline" style={{ maxWidth: '80px', margin: '0 auto 2rem' }} />

          {/* Live Countdown Underneath Date */}
          <motion.div variants={itemVariants}>
            <CountdownSection />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
