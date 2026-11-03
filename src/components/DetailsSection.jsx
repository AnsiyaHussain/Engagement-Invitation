import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function DetailsSection({ onOpenWishes }) {
  const { verse, families, venueName, venueAddressLine1, venueAddressLine2, googleMapsUrl, closing } = INVITATION_CONFIG;

  return (
    <section className="page" id="p2">
      {/* Quranic Arabic Verse */}
      <p className="ar vs" lang="ar" dir="rtl">
        {verse.arabic}
      </p>

      {/* English Translation & Reference */}
      <p className="ve">{verse.english}</p>
      <p className="rf">{verse.reference}</p>

      {/* Delicate Champagne-Gold Rule */}
      <div className="rule" aria-hidden="true" />

      {/* Families Heading */}
      <p className="lb">{families.heading}</p>

      {/* Symmetrical Two-Column Partitioned Family Details Grid */}
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

      {/* Delicate Champagne-Gold Rule */}
      <div className="rule" aria-hidden="true" />

      {/* Venue Information (Centered Across Full Width) */}
      <p className="vn">{venueName}</p>
      <p className="ad">
        {venueAddressLine1}
        <br />
        {venueAddressLine2}
      </p>

      {/* Action Buttons: Directions & Send Your Wishes */}
      <div className="bt">
        <a
          className="b"
          target="_blank"
          rel="noopener noreferrer"
          href={googleMapsUrl}
        >
          Directions
        </a>
        <button
          className="b s"
          type="button"
          onClick={onOpenWishes}
        >
          Send your wishes
        </button>
      </div>

      {/* Sole Closing Blessing */}
      <p className="ft">{closing.farewell}</p>
    </section>
  );
}
