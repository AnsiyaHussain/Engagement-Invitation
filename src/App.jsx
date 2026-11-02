import { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import AnnouncementSection from './components/AnnouncementSection';
import CountdownSection from './components/CountdownSection';
import EventDetailsSection from './components/EventDetailsSection';
import WishesSection from './components/WishesSection';
import ClosingSection from './components/ClosingSection';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="invitation-app">
      {/* Section 1: Opening Screen / Envelope Reveal */}
      {!isOpened && (
        <OpeningScreen onOpen={() => setIsOpened(true)} />
      )}

      {/* Floating Romantic Background Music Player */}
      <FloatingMusicPlayer />

      {/* Main Invitation Sections */}
      <main>
        {/* Unified Ceremony Announcement & Couple Portrait (Single Screen Hero) */}
        <AnnouncementSection />

        {/* Live IST Countdown */}
        <CountdownSection />

        {/* Event Details, Venue & Directions */}
        <EventDetailsSection />

        {/* Wishes from Visitors Guestbook */}
        <WishesSection />

        {/* Emotional Closing Screen */}
        <ClosingSection />
      </main>
    </div>
  );
}
