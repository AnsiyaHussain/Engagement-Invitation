import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function ClosingSection() {
  const { closing, brideShortName, groomName } = INVITATION_CONFIG;

  return (
    <footer id="closing" className="section-container closing-section">
      <motion.div
        className="verse-wrap"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="label-caps">{closing.heading}</p>
        <h2 className="closing-names">
          <span>{brideShortName}</span>
          <span className="closing-amp">&amp;</span>
          <span>{groomName}</span>
        </h2>
        <p className="closing-date">{closing.dateSummary}</p>
        <p className="closing-farewell">{closing.farewell}</p>
      </motion.div>
    </footer>
  );
}