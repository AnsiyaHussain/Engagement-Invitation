import { INVITATION_CONFIG } from '../config/invitationConfig';
import CountdownSection from './CountdownSection';

// Timing (seconds) of the letter-by-letter name reveal
const NAME_START = 1.5;
const LETTER_STAGGER = 0.16;
const GAP_BETWEEN_NAMES = 0.9;

function AnimatedName({ text, className, start, label }) {
  return (
    <div
      className={`name ${className}`}
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
    dateDisplay, timeDisplay, venueName, brideShortName, groomName,
    bismillah, blessingHeader, invitationLines,
  } = INVITATION_CONFIG;

  const nihalStart = NAME_START + (brideShortName.length - 1) * LETTER_STAGGER + GAP_BETWEEN_NAMES;

  return (
    <section id="announcement" className="hero">
      <div className="stack">
        {/* Bismillah, first thing revealed */}
        <p className="ar bis fade bis-hero" lang="ar" dir="rtl">{bismillah.arabic}</p>
        <p className="ref fade bis-en">{bismillah.english}</p>

        <div className="blessing-spacer" />
        <p className="blessing fade">{blessingHeader}</p>
        <div className="blessing-spacer" />

        {/* Names, letter by letter */}
        <AnimatedName
          text={brideShortName}
          className="name-bride"
          start={NAME_START}
          label={`${brideShortName} and ${groomName}`}
        />
        <p className="and fade" aria-hidden="true">and</p>
        <AnimatedName text={groomName} className="name-groom" start={nihalStart} />

        <div className="rule" aria-hidden="true" />

        <p className="invite fade">
          {invitationLines[0]}
          <br />
          {invitationLines[1]}
        </p>

        <p className="date fade">{dateDisplay}</p>
        <p className="time fade">{timeDisplay}</p>
        <p className="time time-venue fade">{venueName}</p>

        <div className="count-fade fade" aria-label="Countdown to the ceremony">
          <CountdownSection />
        </div>
      </div>
    </section>
  );
}
