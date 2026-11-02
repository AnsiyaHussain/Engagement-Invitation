import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function EventDetailsSection() {
  const { eventTitle, dateDisplay, timeDisplay, venueName, venueAddress, googleMapsUrl, brideName, groomName } = INVITATION_CONFIG;

  // Generate Google Calendar Link for RSVP & 1-click sync
  const gcalTitle = encodeURIComponent(`${eventTitle} - ${brideName} & ${groomName}`);
  const gcalDetails = encodeURIComponent(`With the blessings of our families, we joyfully invite you to celebrate our ${eventTitle}.\n\nTime: ${timeDisplay}\nVenue: ${venueName}\nAddress: ${venueAddress}`);
  const gcalLocation = encodeURIComponent(`${venueName}, ${venueAddress}`);
  // 29 Nov 2026 5:00 PM IST is 20261129T113000Z to 20261129T133000Z
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=20261129T113000Z/20261129T133000Z&details=${gcalDetails}&location=${gcalLocation}`;

  return (
    <section
      id="event-details"
      className="section-container"
      style={{
        textAlign: 'center',
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        backgroundColor: 'var(--ivory)',
      }}
    >
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        {/* Paper Panel */}
        <motion.div
          className="paper-panel"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            border: '1px solid var(--line)',
            backgroundColor: 'var(--paper)',
            padding: '3rem 1.8rem 2.8rem',
            textAlign: 'center',
          }}
        >
          {/* Section Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              marginBottom: '1rem',
            }}
          >
            CELEBRATION VENUE & DETAILS
          </p>

          {/* Section Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.85rem, 5vw, 2.4rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              letterSpacing: '0.02em',
              marginBottom: '0.6rem',
            }}
          >
            {venueName}
          </h2>

          <div className="hairline" style={{ maxWidth: '80px', margin: '1.2rem auto' }} />

          {/* Address */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.86rem',
              color: 'var(--ink)',
              lineHeight: 1.7,
              maxWidth: '380px',
              margin: '0 auto 1.8rem',
              opacity: 0.9,
            }}
          >
            {venueAddress}
          </p>

          {/* Date & Time Summary Box */}
          <div
            style={{
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              padding: '1.2rem 0',
              marginBottom: '2.2rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--ink)',
                marginBottom: '0.25rem',
              }}
            >
              {dateDisplay}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.76rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}
            >
              {timeDisplay} (IST)
            </div>
          </div>

          {/* Action Buttons: Minimal Outlined Buttons, No Shadows, No Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', maxWidth: '340px', margin: '0 auto' }}>
            <a
              id="get-directions-btn"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outlined"
              style={{ width: '100%' }}
            >
              Get Directions
            </a>

            <a
              id="add-to-calendar-btn"
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outlined"
              style={{ width: '100%' }}
            >
              RSVP & Add to Calendar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
