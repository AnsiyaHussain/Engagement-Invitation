import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function CountdownSection() {
  const { targetDateISO } = INVITATION_CONFIG;
  const [timeLeft, setTimeLeft] = useState(() => calculateRemaining(targetDateISO));

  function calculateRemaining(targetIso) {
    const targetMs = Date.parse(targetIso);
    const diff = targetMs - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      total: diff,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateRemaining(targetDateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateISO]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div id="countdown" style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.66rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--gold)',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        COUNTING DOWN
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          padding: '1.1rem 0',
        }}
      >
        {units.map((unit, index) => (
          <div
            key={unit.label}
            style={{
              textAlign: 'center',
              borderRight: index < units.length - 1 ? '1px solid var(--line)' : 'none',
              padding: '0 0.4rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 4.5vw, 2.1rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: 'var(--ink)',
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                opacity: 0.75,
                marginTop: '0.35rem',
              }}
            >
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
