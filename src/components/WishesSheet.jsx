import { useState, useEffect } from 'react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function WishesSheet({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const relation = 'Family & Friends';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [recentWishes, setRecentWishes] = useState([]);

  // Fetch existing wishes on mount
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch('/api/wishes');
        if (res.ok) {
          const data = await res.json();
          if (data.wishes && Array.isArray(data.wishes)) {
            setRecentWishes(data.wishes);
            return;
          }
        }
      } catch {
        // Fallback to local storage
      }

      const saved = localStorage.getItem('engagement_wishes_backup');
      if (saved) {
        try {
          setRecentWishes(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    };

    fetchWishes();
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please write your heartfelt wishes or dua.');
      return;
    }

    setIsSubmitting(true);

    const newWish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      relation,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish),
      });
    } catch {
      // Offline / client-only mode fallback
    }

    // Save to local storage backup
    try {
      const existing = JSON.parse(localStorage.getItem('engagement_wishes_backup') || '[]');
      const updated = [newWish, ...existing];
      localStorage.setItem('engagement_wishes_backup', JSON.stringify(updated));
      setRecentWishes(updated);
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setIsSent(true);
    setName('');
    setMessage('');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="sh-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-Up Wishes Sheet */}
      <div
        className={`sh ${isOpen ? 'o' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Send your wishes"
      >
        <button
          className="x"
          type="button"
          aria-label="Close wishes sheet"
          onClick={onClose}
        >
          ×
        </button>

        <p className="lb">Your Wishes</p>

        {/* Traditional Wedding Dua */}
        <p
          className="ar"
          style={{ fontSize: '24px', lineHeight: '1.9', marginTop: '8px', color: 'var(--wine)' }}
          lang="ar"
          dir="rtl"
        >
          {INVITATION_CONFIG.blessingDua.arabic}
        </p>

        {isSent ? (
          <div style={{ marginTop: '20px', padding: '16px 0' }}>
            <p className="th" style={{ display: 'block' }}>
              Jazakallahu khairan. Your wishes have reached Ansiya &amp; Nihal!
            </p>
            <button
              className="b"
              type="button"
              style={{ marginTop: '16px' }}
              onClick={() => setIsSent(false)}
            >
              Send another dua
            </button>
          </div>
        ) : (
          <form id="wf" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="wn">Your Name</label>
              <input
                id="wn"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                maxLength={60}
              />
            </div>

            <div>
              <label htmlFor="wm">Your Dua &amp; Wishes</label>
              <textarea
                id="wm"
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your prayers & congratulations..."
                required
                maxLength={300}
              />
            </div>

            {errorMsg && (
              <p style={{ color: 'var(--wine)', fontSize: '13px', textAlign: 'center' }}>
                {errorMsg}
              </p>
            )}

            <button
              className="b s"
              type="submit"
              disabled={isSubmitting}
              style={{ justifySelf: 'center', marginTop: '4px' }}
            >
              {isSubmitting ? 'Sending...' : 'Send wishes'}
            </button>
          </form>
        )}

        {/* Recent Wishes List (if any) */}
        {recentWishes.length > 0 && (
          <div className="wishes-list-wrap">
            <div className="rule" style={{ margin: '24px auto 16px' }} />
            <p className="lb" style={{ marginBottom: '14px' }}>Heartfelt Wishes</p>
            <div className="wishes-scroll-box">
              {recentWishes.slice(0, 6).map((item, idx) => (
                <div key={item.id || idx} className="wish-item-card">
                  <p className="wish-text">“{item.message}”</p>
                  <p className="wish-author">— {item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
