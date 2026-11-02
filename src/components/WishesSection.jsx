import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, CheckCircle2, MessageSquareHeart, User, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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

  // Fallback seed wishes in case backend is offline
  const SEED_WISHES = [

  ];

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

    // Fallback to localStorage or seed wishes
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
    setWishes(SEED_WISHES);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Client-side validation
    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setErrorMsg('Please write a heartfelt wish (at least 5 characters).');
      return;
    }
    if (message.trim().length > MAX_CHARS) {
      setErrorMsg(`Wishes are limited to ${MAX_CHARS} characters.`);
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
          honeypot, // Honeypot field for anti-spam
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit wish.');
      }

      // Trigger delicate celebration confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#C6A36B', '#DFCA9B', '#50372F', '#E8D8C6'],
      });

      setSuccessMsg(result.message || 'Thank you for your warm wishes and blessings!');
      setName('');
      setMessage('');
      setRelation('Well-wisher');

      // Update feed if wish was directly approved
      if (result.wish) {
        setWishes(prev => [result.wish, ...prev]);
      } else {
        fetchWishes();
      }
    } catch (err) {
      // Offline fallback handling
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

      confetti({
        particleCount: 40,
        spread: 50,
        colors: ['#C6A36B', '#DFCA9B', '#50372F'],
      });

      setSuccessMsg('Thank you for your warm wishes and blessings!');
      setName('');
      setMessage('');
      setRelation('Well-wisher');
    } finally {
      setIsSubmitting(false);
    }
  };

  const relations = ['Family', 'Friend', 'Colleague', 'Well-wisher'];

  return (
    <section id="wishes" className="section-container" style={{ textAlign: 'center' }}>
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
            <MessageSquareHeart size={13} style={{ color: 'var(--color-antique-gold)' }} />
            Guestbook of Blessings
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
            fontSize: '2rem',
            color: 'var(--color-espresso)',
            marginBottom: '0.4rem',
            lineHeight: 1.25,
          }}
        >
          Your Wishes Mean the World to Us
        </motion.h2>

        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--color-espresso-light)',
            marginBottom: '2rem',
          }}
        >
          Leave a heartfelt blessing or memory to celebrate our beginning.
        </p>

        {/* Wish Submission Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85 }}
          className="luxury-card"
          style={{
            padding: '2.2rem 1.6rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            textAlign: 'left',
            marginBottom: '2.5rem',
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Honeypot field for bot suppression (hidden from users) */}
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
            <div style={{ marginBottom: '1.2rem' }}>
              <label
                htmlFor="guest-name-input"
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-espresso-light)',
                  fontWeight: 600,
                  marginBottom: '0.4rem',
                }}
              >
                Your Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="guest-name-input"
                  type="text"
                  placeholder="e.g. Priya & Rohan"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={60}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(198, 163, 107, 0.4)',
                    backgroundColor: 'rgba(248, 243, 237, 0.4)',
                    color: 'var(--color-espresso)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-antique-gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(198, 163, 107, 0.4)'}
                />
                <User
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-antique-gold)',
                  }}
                />
              </div>
            </div>

            {/* Relationship Filter / Tag */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-espresso-light)',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Relationship / Connection
              </label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {relations.map(rel => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => setRelation(rel)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      border: relation === rel ? '1px solid var(--color-antique-gold)' : '1px solid rgba(198, 163, 107, 0.3)',
                      backgroundColor: relation === rel ? 'var(--color-espresso)' : 'rgba(255, 255, 255, 0.8)',
                      color: relation === rel ? 'var(--color-warm-ivory)' : 'var(--color-espresso-light)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>

            {/* Wish Message Textarea */}
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label
                  htmlFor="guest-message-input"
                  style={{
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-espresso-light)',
                    fontWeight: 600,
                  }}
                >
                  Personal Wish or Blessing
                </label>
                <span style={{ fontSize: '0.72rem', color: message.length > MAX_CHARS - 20 ? 'red' : 'var(--color-espresso-light)' }}>
                  {message.length}/{MAX_CHARS}
                </span>
              </div>
              <textarea
                id="guest-message-input"
                rows={4}
                placeholder="Write your loving blessings for our engagement..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={MAX_CHARS}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(198, 163, 107, 0.4)',
                  backgroundColor: 'rgba(248, 243, 237, 0.4)',
                  color: 'var(--color-espresso)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  resize: 'none',
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-antique-gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(198, 163, 107, 0.4)'}
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(217, 83, 79, 0.1)',
                  border: '1px solid rgba(217, 83, 79, 0.3)',
                  color: '#A94442',
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                }}
              >
                <AlertCircle size={15} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message Banner */}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(198, 163, 107, 0.15)',
                  border: '1px solid var(--color-antique-gold)',
                  color: 'var(--color-espresso)',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  fontWeight: 500,
                }}
              >
                <CheckCircle2 size={18} style={{ color: 'var(--color-antique-gold)' }} />
                <span>{successMsg}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              id="submit-wish-btn"
              type="submit"
              disabled={isSubmitting}
              className="btn-luxury"
              style={{ width: '100%' }}
            >
              {isSubmitting ? (
                <span>Submitting Blessing...</span>
              ) : (
                <>
                  <Send size={15} style={{ color: 'var(--color-antique-gold)' }} />
                  <span>Send Your Blessing</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Wishes Display Board */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              color: 'var(--color-espresso)',
              marginBottom: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Warm Blessings</span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(198, 163, 107, 0.2)',
                color: 'var(--color-espresso)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {wishes.length}
            </span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence>
              {wishes.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.4) }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(198, 163, 107, 0.3)',
                    boxShadow: '0 4px 18px rgba(80, 55, 47, 0.05)',
                    padding: '1.25rem 1.2rem',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      {/* Monogram Initial Avatar */}
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(198, 163, 107, 0.18)',
                          border: '1px solid rgba(198, 163, 107, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 600,
                          color: 'var(--color-espresso)',
                        }}
                      >
                        {item.name ? item.name.charAt(0).toUpperCase() : 'G'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-espresso)' }}>
                          {item.name}
                        </div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--color-antique-gold)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            fontWeight: 500,
                          }}
                        >
                          {item.relation || 'Well-wisher'}
                        </span>
                      </div>
                    </div>
                    <Heart size={14} style={{ color: 'var(--color-antique-gold)', opacity: 0.7 }} />
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.02rem',
                      lineHeight: 1.5,
                      color: 'var(--color-espresso)',
                      fontStyle: 'italic',
                      paddingLeft: '0.2rem',
                    }}
                  >
                    "{item.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
