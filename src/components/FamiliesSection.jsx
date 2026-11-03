import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';

function Person({ data }) {
  return (
    <div className="fam">
      <p className="fam-name">{data.name}</p>
      {data.lineage.map((row, i) => (
        <Fragment key={i}>
          <p className="fam-rel">{row.relation}</p>
          <div className="fam-people">
            {row.people.map((person, j) => (
              <Fragment key={person}>
                {j > 0 && <span className="fam-amp" aria-hidden="true">&amp;</span>}
                <span className="fam-person">{person}</span>
              </Fragment>
            ))}
          </div>
          {i < data.lineage.length - 1 && <div className="gold-dot" aria-hidden="true" />}
        </Fragment>
      ))}
    </div>
  );
}

export default function FamiliesSection() {
  const { families } = INVITATION_CONFIG;

  return (
    <section id="families" className="section-container families-section">
      <motion.div
        className="families-wrap"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="label-caps">{families.heading}</p>
        <div className="gold-rule" aria-hidden="true" />

        <Person data={families.bride} />

        <div className="fam-between" aria-hidden="true">&amp;</div>

        <Person data={families.groom} />
      </motion.div>
    </section>
  );
}