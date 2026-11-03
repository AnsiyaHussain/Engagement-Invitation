import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';

const triggerCelebration = async (count = 35) => {
  try {
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: count,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#A8833F', '#4A3730', '#E6D9C3'],
    });
  } catch {
    // Dynamic import fallback
  }
};

export default function WishesSection() {
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Well-wisher');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot

  const MAX_CHARS = 300;

  // Fetch approved wishes from backend
  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const data = await res.json();
        if (data.wishes && data.wishes.length > 0) {
          setWishes(data.wishes);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Backend request error
    }

    // Fallback to localStorage
    const saved = localStorage.getItem('engagement_wishes_backup');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
        setIsLoading(false);
        return;
      } catch {
        // ignore
      }
    }
    setWishes([]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setErrorMsg('Please write your wishes (at least 5 characters).');
      return;
    }
    if (message.trim().length > MAX_CHARS) {
      setErrorMsg(`Messages are limited to ${MAX_CHARS} characters.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          relation,
          honeypot,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit message.');
      }

      triggerCelebration(35);
      setSuccessMsg(result.message || 'Thank you for your warm wishes!');
      setName('');
      setMessage('');
      setRelation('Well-wisher');

      if (result.wish) {
        setWishes(prev => [result.wish, ...prev]);
      } else {
        fetchWishes();
      }
    } catch {
      // Offline localStorage fallback
      const fallbackWish = {
        id: `local-${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        relation,
        createdAt: new Date().toISOString(),
      };
      const updated = [fallbackWish, ...wishes];
      setWishes(updated);
      localStorage.setItem('engagement_wishes_backup', JSON.stringify(updated));

      triggerCelebration(25);
      setSuccessMsg('Jazakallahu khairan for signing our guestbook!');
      setName('');
      setMessage('');
      setRelation('Well-wisher');
    } finally {
      setIsSubmitting(false);
    }
  };

  const relations = ['Family', 'Friend', 'Colleague', 'Well-wisher'];

  return (
    <section
      id="wishes"
      className="section-container"
      style={{
        textAlign: 'center',
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        backgroundColor: 'var(--ivory)',
      }}
    >
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        {/* Main Guestbook Paper Panel */}
        <motion.div
          className="paper-panel"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          style={{
            border: '1px solid var(--line)',
            backgroundColor: 'var(--paper)',
            padding: '3rem 1.8rem 2.8rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              marginBottom: '0.8rem',
            }}
          >
            wishes
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.85rem, 5vw, 2.3rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              letterSpacing: '0.02em',
              marginBottom: '0.6rem',
            }}
          >
            Send Your Wishes
          </h2>

          <div className="hairline" style={{ maxWidth: '80px', margin: '1rem auto 1.8rem' }} />

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.86rem',
              color: 'var(--ink)',
              lineHeight: 1.6,
              maxWidth: '380px',
              margin: '0 auto 1.6rem',
              opacity: 0.85,
            }}
          >
            Your good wishes will forever be a cherished part of our beginning.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            {/* Honeypot field for bot suppression */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {/* Name Input */}
            <div style={{ marginBottom: '1.4rem' }}>
              <label
                htmlFor="guest-name-input"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: 'var(--ink)',
                  marginBottom: '0.4rem',
                }}
              >
                Your Name
              </label>
              <input
                id="guest-name-input"
                type="text"
                placeholder="e.g. Priya & Rohan"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={60}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 0,
                  border: '1px solid var(--line)',
                  backgroundColor: 'var(--ivory)',
                  color: 'var(--ink)',
                  fontSize: '0.88rem',
                }}
              />
            </div>

            {/* Relationship / Connection */}
            <div style={{ marginBottom: '1.4rem' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: 'var(--ink)',
                  marginBottom: '0.5rem',
                }}
              >
                Relationship / Connection
              </label>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {relations.map(rel => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => setRelation(rel)}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: 0,
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: relation === rel ? '1px solid var(--ink)' : '1px solid var(--line)',
                      backgroundColor: relation === rel ? 'var(--ink)' : 'transparent',
                      color: relation === rel ? 'var(--paper)' : 'var(--ink)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div style={{ marginBottom: '1.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label
                  htmlFor="guest-message-input"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--ink)',
                  }}
                >
                  Your Wishes
                </label>
                <span style={{ fontSize: '0.7rem', color: 'var(--ink)', opacity: 0.6 }}>
                  {message.length}/{MAX_CHARS}
                </span>
              </div>
              <textarea
                id="guest-message-input"
                rows={4}
                placeholder="Write your wishes..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={MAX_CHARS}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 0,
                  border: '1px solid var(--line)',
                  backgroundColor: 'var(--ivory)',
                  color: 'var(--ink)',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  resize: 'none',
                }}
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div
                style={{
                  padding: '0.7rem 0.9rem',
                  border: '1px solid var(--ink)',
                  backgroundColor: 'var(--ivory)',
                  color: 'var(--ink)',
                  fontSize: '0.78rem',
                  marginBottom: '1.2rem',
                  letterSpacing: '0.04em',
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--gold)',
                  backgroundColor: 'var(--ivory)',
                  color: 'var(--ink)',
                  fontSize: '0.82rem',
                  marginBottom: '1.2rem',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                }}
              >
                {successMsg}
              </div>
            )}

            {/* Minimal Outlined Submit Button */}
            <button
              id="submit-wish-btn"
              type="submit"
              disabled={isSubmitting}
              className="btn-outlined"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {isSubmitting ? 'Sending...' : 'Send Wishes'}
            </button>
          </form>
        </motion.div>

        {/* Guestbook Entries Board */}
        {wishes.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--gold)',
                marginBottom: '1.5rem',
              }}
            >
              Wishes ({wishes.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <AnimatePresence>
                {wishes.map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      backgroundColor: 'var(--paper)',
                      border: '1px solid var(--line)',
                      padding: '1.6rem 1.4rem',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.15rem',
                          color: 'var(--ink)',
                          fontWeight: 400,
                        }}
                      >
                        {item.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.66rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: 'var(--gold)',
                        }}
                      >
                        {item.relation || 'Well-wisher'}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: 'var(--ink)',
                        margin: 0,
                      }}
                    >
                      "{item.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
