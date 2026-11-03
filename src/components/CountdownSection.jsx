import { useState, useEffect } from 'react';
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

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="cd" aria-label="Countdown to engagement ceremony">
      <div>
        <b>{pad(timeLeft.days)}</b>
        <small>Days</small>
      </div>
      <div>
        <b>{pad(timeLeft.hours)}</b>
        <small>Hours</small>
      </div>
      <div>
        <b>{pad(timeLeft.minutes)}</b>
        <small>Mins</small>
      </div>
      <div>
        <b>{pad(timeLeft.seconds)}</b>
        <small>Secs</small>
      </div>
    </div>
  );
}
