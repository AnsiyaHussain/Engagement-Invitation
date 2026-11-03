import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function FamiliesSection() {
  const { families } = INVITATION_CONFIG;

  return (
    <section id="families" className="page">
      <p className="lb">{families.heading}</p>

      <div className="family-details-grid">
        {/* Left Column: Bride */}
        <div className="bride-family">
          <h3>Ansiya Hussain</h3>
          <em>daughter of</em>
          <p>
            Hussain <b>&amp;</b> Fathima Beevi
          </p>
        </div>

        {/* Right Column: Groom */}
        <div className="groom-family">
          <h3>Nihal</h3>
          <em>grandson of</em>
          <p>
            Late Sunnasahib
            <br />
            Ex. MP <b>&amp;</b> Pyarijan
          </p>
          <em>son of</em>
          <p>
            Ullas <b>&amp;</b> Gulrukh
          </p>
        </div>
      </div>
    </section>
  );
}
