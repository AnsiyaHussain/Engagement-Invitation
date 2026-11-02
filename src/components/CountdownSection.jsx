import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
  const [isCompleted, setIsCompleted] = useState(false);

  function calculateTimeLeft() {
    // Target is Sunday, 29 November 2026, 5:00 PM India Standard Time (IST)
    const targetMs = Date.parse(INVITATION_CONFIG.targetDateISO);
    const nowMs = Date.now();
    const diff = targetMs - nowMs;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, total: diff };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining.total <= 0) {
        setIsCompleted(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="section-container" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '1.2rem' }}
        >
          <span className="gold-pill-badge">
            <Clock size={13} style={{ color: 'var(--color-antique-gold)' }} />
            The Celebration Countdown
          </span>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.9rem',
            color: 'var(--color-espresso)',
            marginBottom: '0.4rem',
          }}
        >
          Counting Down to Our Day
        </motion.h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-espresso-light)',
            letterSpacing: '0.04em',
            marginBottom: '2rem',
          }}
        >
          {INVITATION_CONFIG.dateDisplay} • {INVITATION_CONFIG.timeDisplay} ({INVITATION_CONFIG.timezoneDisplay})
        </p>

        {/* Live Countdown Cards Grid */}
        {isCompleted || timeLeft.total <= 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="luxury-card"
            style={{ padding: '2.5rem 1.5rem', backgroundColor: '#FFFFFF' }}
          >
            <CheckCircle size={36} style={{ color: 'var(--color-antique-gold)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-espresso)', marginBottom: '0.5rem' }}>
              The Celebration Has Begun!
            </h3>
            <p style={{ color: 'var(--color-espresso-light)', fontSize: '0.9rem' }}>
              We are joyfully celebrating our engagement. Thank you for your heartfelt love and blessings!
            </p>
          </motion.div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.65rem',
              width: '100%',
              margin: '0 auto',
            }}
          >
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(198, 163, 107, 0.35)',
                  boxShadow: '0 8px 24px rgba(80, 55, 47, 0.06)',
                  padding: '1.1rem 0.4rem 0.9rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '88px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Gold Top Accent Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '15%',
                    right: '15%',
                    height: '2px',
                    background: 'var(--color-antique-gold)',
                    opacity: 0.6,
                  }}
                />

                {/* Number with smooth tick transition */}
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.95rem',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    color: 'var(--color-espresso)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </span>

                {/* Unit Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--color-espresso-light)',
                    marginTop: '0.35rem',
                    fontWeight: 500,
                  }}
                >
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
