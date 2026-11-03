import { INVITATION_CONFIG } from '../config/invitationConfig';
import CountdownSection from './CountdownSection';

// Letter-by-letter stagger timing
const NAME_START = 1.6;
const LETTER_STAGGER = 0.15;
const GAP_AFTER_BRIDE = 1.0;

function AnimatedLetters({ text, className, start, label }) {
  return (
    <div
      className={`nm ${className}`}
      {...(label ? { role: 'heading', 'aria-level': 1, 'aria-label': label } : { 'aria-hidden': 'true' })}
    >
      {[...text].map((char, index) => (
        <span
          key={index}
          className="ch"
          aria-hidden="true"
          style={{ transitionDelay: `${(start + index * LETTER_STAGGER).toFixed(2)}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementSection() {
  const {
    dateDisplay,
    timeDisplay,
    brideShortName,
    groomName,
    bismillah,
    blessingIntro,
    invitationNote,
  } = INVITATION_CONFIG;

  const ringsDelay = (NAME_START + (brideShortName.length - 1) * LETTER_STAGGER + 0.35).toFixed(2);
  const groomStart = NAME_START + (brideShortName.length - 1) * LETTER_STAGGER + GAP_AFTER_BRIDE;

  return (
    <main className="page" id="p1">
      {/* Arabic Bismillah */}
      <p className="ar bis f" style={{ '--t': '0.9s' }} lang="ar" dir="rtl">
        {bismillah.arabic}
      </p>

      {/* English Meaning */}
      <p className="en f" style={{ '--t': '1.0s' }}>
        {bismillah.english}
      </p>

      {/* Delicate Champagne-Gold Rule */}
      <div className="rule f" style={{ '--t': '1.1s' }} aria-hidden="true" />

      {/* Blessings Subtitle */}
      <p className="lb f" style={{ '--t': '1.2s' }}>
        {blessingIntro}
      </p>

      <div style={{ height: '2svh' }} />

      {/* Bride Name: Ansiya */}
      <AnimatedLetters
        text={brideShortName}
        className="name-bride"
        start={NAME_START}
        label={`${brideShortName} and ${groomName}`}
      />

      {/* Two Elegant Interlocking Gold Wedding Rings (Replaces the ampersand / AND) */}
      <div
        className="and-rings f"
        style={{ '--t': `${ringsDelay}s` }}
        aria-hidden="true"
      >
        <img
          src={`${import.meta.env.BASE_URL}rings.png`}
          alt="Interlocking Wedding Rings"
          className="hero-rings"
          width={64}
          height={64}
        />
      </div>

      {/* Groom Name: Nihal */}
      <AnimatedLetters
        text={groomName}
        className="name-groom"
        start={groomStart}
      />

      {/* Delicate Champagne-Gold Rule */}
      <div className="rule f" style={{ '--t': '3.9s' }} aria-hidden="true" />

      {/* Warm Invitation Line */}
      <p className="inv f" style={{ '--t': '4.1s' }}>
        {invitationNote}
      </p>

      {/* Date */}
      <p className="dt f" style={{ '--t': '4.3s' }}>
        {dateDisplay}
      </p>

      {/* Time & Venue */}
      <p className="tm f" style={{ '--t': '4.5s' }}>
        {timeDisplay}
      </p>

      {/* Live Countdown */}
      <div className="f" style={{ '--t': '4.8s' }}>
        <CountdownSection />
      </div>

      {/* Swipe up hint to Page 2 */}
      <a className="hint f" style={{ '--t': '5.2s' }} href="#p2">
        Swipe up
      </a>
    </main>
  );
}
