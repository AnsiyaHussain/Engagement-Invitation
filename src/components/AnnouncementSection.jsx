import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import PetalCanvas from './PetalCanvas';

export default function AnnouncementSection() {
  const { blessingHeader, invitationCallout, eventTitle, brideName, groomName, portraitImageSrc, portraitTopCaption } = INVITATION_CONFIG;

  return (
    <section
      id="announcement"
      className="section-container"
      style={{
        textAlign: 'center',
        paddingTop: '2.5rem',
        paddingBottom: '3.5rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        {/* Subtle Decorative Golden Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '0.8rem' }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              margin: '0 auto',
              border: '1px solid rgba(198, 163, 107, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <Sparkles size={16} style={{ color: 'var(--color-antique-gold)' }} />
          </div>
        </motion.div>

        {/* Blessings Header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.76rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-espresso-light)',
            fontWeight: 500,
            marginBottom: '0.35rem',
          }}
        >
          {blessingHeader}
        </motion.p>

        {/* Joyful Invitation Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            fontStyle: 'italic',
            lineHeight: 1.35,
            color: 'var(--color-espresso)',
            marginBottom: '1.4rem',
            fontWeight: 400,
          }}
        >
          {invitationCallout}
        </motion.h2>

        {/* Primary Announcement Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card"
          style={{
            padding: '2.2rem 1.6rem 2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(198, 163, 107, 0.4)',
            borderRadius: '24px',
            boxShadow: '0 14px 40px rgba(80, 55, 47, 0.08)',
            marginBottom: '2rem',
          }}
        >
          {/* Ceremony Subtitle */}
          <div
            style={{
              fontSize: '0.74rem',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--color-antique-gold)',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            ✦ {eventTitle} ✦
          </div>

          {/* Couple Names in Elegant Serif & Calligraphy */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              lineHeight: 1.15,
              color: 'var(--color-espresso)',
              margin: '0 0 1.2rem',
            }}
          >
            <span>{brideName}</span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-script)',
                fontSize: '2rem',
                color: 'var(--color-antique-gold)',
                margin: '0.2rem 0',
                fontWeight: 400,
              }}
            >
              and
            </span>
            <span>{groomName}</span>
          </h1>

          {/* Divider & Vows Line */}
          <div className="gold-divider" style={{ margin: '1rem auto' }}>
            <Heart size={14} className="gold-divider-icon" />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.08rem',
              color: 'var(--color-espresso-light)',
              fontStyle: 'italic',
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            As they take their first vows of a lifelong journey together
          </p>
        </motion.div>

        {/* The Image Card: Phone Full Screen Size in OG Image Portrait Aspect Ratio (599x1024) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card"
          style={{
            padding: '10px',
            borderRadius: '24px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 20px 60px rgba(80, 55, 47, 0.12), 0 0 0 1px rgba(198, 163, 107, 0.35)',
            width: '100%',
            maxWidth: '390px',
            margin: '0 auto',
          }}
        >
          {/* Inner Photo Frame at Exact 599:1024 Ratio */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '599 / 1024',
              width: '100%',
              backgroundColor: '#F8F3ED',
            }}
          >
            {/* Full Uncropped Original Portrait */}
            <picture>
              <source srcSet="./images/couple-portrait.webp" type="image/webp" />
              <motion.img
                src="./images/couple-portrait.jpg"
                alt={`${brideName} & ${groomName}`}
                width="599"
                height="1024"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
                initial={{ scale: 1.01 }}
                animate={{ scale: [1.01, 1.03, 1.01] }}
                transition={{
                  repeat: Infinity,
                  duration: 14,
                  ease: 'easeInOut',
                }}
              />
            </picture>

            {/* Subtle Warm Amber Vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 25%, rgba(255, 248, 240, 0.03) 0%, rgba(80, 55, 47, 0.05) 85%, rgba(80, 55, 47, 0.14) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Blended Cute Top Caption */}
            <div
              style={{
                position: 'absolute',
                top: '28px',
                left: '12px',
                right: '12px',
                textAlign: 'center',
                zIndex: 15,
                pointerEvents: 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '2.25rem',
                  color: 'var(--color-espresso)',
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: '0.01em',
                  textShadow: '0 2px 14px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.85)',
                }}
              >
                {portraitTopCaption}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.35rem' }}>
                <span style={{ height: '1px', width: '24px', background: 'var(--color-antique-gold)', opacity: 0.6 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-antique-gold)', opacity: 0.85 }}>♡</span>
                <span style={{ height: '1px', width: '24px', background: 'var(--color-antique-gold)', opacity: 0.6 }} />
              </div>
            </div>

            {/* Delicate Floating Flower Petals Particle Canvas */}
            <PetalCanvas count={16} speed={0.7} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
