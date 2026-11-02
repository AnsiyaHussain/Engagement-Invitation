import { INVITATION_CONFIG } from '../config/invitationConfig';
import CountdownSection from './CountdownSection';

export default function AnnouncementSection() {
  const { dateDisplay, timeDisplay, venueName } = INVITATION_CONFIG;

  const ansiyaLetters = ['A', 'n', 's', 'i', 'y', 'a'];
  const nihalLetters = ['N', 'i', 'h', 'a', 'l'];

  return (
    <section id="announcement" className="hero">
      <div className="stack">
        {/* 1.2s: "With the blessings of our families" */}
        <p className="blessing fade">With the blessings of our families</p>
        <div className="blessing-spacer" />

        {/* 1.5s onward: "Ansiya" letter by letter */}
        <h1 className="name name-ansiya" aria-label="Ansiya and Nihal">
          {ansiyaLetters.map((char, index) => (
            <span key={index} className="ch" aria-hidden="true">
              {char}
            </span>
          ))}
        </h1>

        {/* 2.6s: "and" */}
        <p className="and fade" aria-hidden="true">
          and
        </p>

        {/* After "and": "Nihal" letter by letter */}
        <div className="name name-nihal" aria-hidden="true">
          {nihalLetters.map((char, index) => (
            <span key={index} className="ch" aria-hidden="true">
              {char}
            </span>
          ))}
        </div>

        {/* 3.2s: 1px gold vertical line grows 0 to 56px */}
        <div className="rule" aria-hidden="true" />

        {/* 3.7s onward: Invitation line, then date, time, and countdown */}
        <p className="invite fade">
          request the pleasure of your company
          <br />
          at their engagement ceremony
        </p>

        <p className="date fade">{dateDisplay}</p>
        <p className="time fade">
          {timeDisplay} &nbsp;·&nbsp; {venueName}
        </p>

        <div className="count-fade fade" aria-label="Countdown to the ceremony">
          <CountdownSection />
        </div>
      </div>
    </section>
  );
}
