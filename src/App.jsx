import { useState, lazy, Suspense } from 'react';
import OpeningScreen from './components/OpeningScreen';
import AnnouncementSection from './components/AnnouncementSection';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';

// Production Code Splitting: Lazy-load below-the-fold sections
const CountdownSection = lazy(() => import('./components/CountdownSection'));
const EventDetailsSection = lazy(() => import('./components/EventDetailsSection'));
const WishesSection = lazy(() => import('./components/WishesSection'));
const ClosingSection = lazy(() => import('./components/ClosingSection'));

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

        {/* Below-the-fold sections with lightweight Suspense boundaries */}
        <Suspense fallback={null}>
          <CountdownSection />
          <EventDetailsSection />
          <WishesSection />
          <ClosingSection />
        </Suspense>
      </main>
    </div>
  );
}
