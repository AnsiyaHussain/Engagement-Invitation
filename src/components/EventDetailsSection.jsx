import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Navigation, CalendarPlus } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export default function EventDetailsSection() {
  const { eventTitle, dateDisplay, timeDisplay, venueName, venueAddress, googleMapsUrl } = INVITATION_CONFIG;

  // Generate Google Calendar Link
  const gcalTitle = encodeURIComponent(`${eventTitle} - ${INVITATION_CONFIG.brideName} & ${INVITATION_CONFIG.groomName}`);
  const gcalDetails = encodeURIComponent(`We joyfully invite you to celebrate our ${eventTitle}.\n\nTime: ${timeDisplay}\nVenue: ${venueName}\nAddress: ${venueAddress}`);
  const gcalLocation = encodeURIComponent(`${venueName}, ${venueAddress}`);
  // 29 Nov 2026 5:00 PM IST is 20261129T113000Z to 20261129T133000Z
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=20261129T113000Z/20261129T133000Z&details=${gcalDetails}&location=${gcalLocation}`;

  return (
    <section id="event-details" className="section-container" style={{ textAlign: 'center' }}>
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
            <Calendar size={13} style={{ color: 'var(--color-antique-gold)' }} />
            Event Itinerary & Location
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
          }}
        >
          Ceremony & Celebration
        </motion.h2>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--color-espresso-light)',
            marginBottom: '2rem',
          }}
        >
          Join us for an evening of warmth, blessings, and cherished moments.
        </p>

        {/* Primary Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card"
          style={{
            padding: '2.5rem 1.8rem',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            border: '1px solid rgba(198, 163, 107, 0.4)',
            textAlign: 'center',
          }}
        >
          {/* Card Top Title */}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-antique-gold)',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            {eventTitle}
          </div>

          <div className="gold-divider" style={{ margin: '0.8rem auto 1.8rem' }} />

          {/* Date & Time Box */}
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                color: 'var(--color-espresso)',
                marginBottom: '0.4rem',
              }}
            >
              <Calendar size={18} style={{ color: 'var(--color-antique-gold)' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600 }}>
                {dateDisplay}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: 'var(--color-espresso-light)',
                fontSize: '0.92rem',
              }}
            >
              <Clock size={16} style={{ color: 'var(--color-antique-gold)' }} />
              <span>{timeDisplay} (IST)</span>
            </div>
          </div>

          {/* Venue & Address Box */}
          <div
            style={{
              padding: '1.4rem 1.2rem',
              backgroundColor: 'rgba(248, 243, 237, 0.65)',
              borderRadius: '16px',
              border: '1px solid rgba(198, 163, 107, 0.25)',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--color-antique-gold)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              <MapPin size={15} />
              <span>Celebration Venue</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 600,
                color: 'var(--color-espresso)',
                marginBottom: '0.35rem',
              }}
            >
              {venueName}
            </h3>

            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--color-espresso-light)',
                lineHeight: 1.5,
              }}
            >
              {venueAddress}
            </p>
          </div>

          {/* Action Buttons: Get Directions & Add to Calendar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <a
              id="get-directions-btn"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury"
              style={{ width: '100%' }}
            >
              <Navigation size={16} style={{ color: 'var(--color-antique-gold)' }} />
              <span>Get Directions</span>
            </a>

            <a
              id="add-to-calendar-btn"
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline"
              style={{ width: '100%' }}
            >
              <CalendarPlus size={16} style={{ color: 'var(--color-espresso)' }} />
              <span>Add to Google Calendar</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
