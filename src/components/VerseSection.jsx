import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function VerseSection() {
  const { verse } = INVITATION_CONFIG;

  return (
    <section id="verse" className="section-container verse-section">
      <motion.div
        className="verse-wrap"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="ar verse-ar" lang="ar" dir="rtl">{verse.arabic}</p>
        <div className="gold-rule" aria-hidden="true" />
        <p className="verse-en">{verse.english}</p>
        <p className="ref">{verse.reference}</p>
      </motion.div>
    </section>
  );
}
