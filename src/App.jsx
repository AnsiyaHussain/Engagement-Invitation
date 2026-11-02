import { lazy, Suspense } from 'react';
import OpeningScreen from './components/OpeningScreen';
import AnnouncementSection from './components/AnnouncementSection';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';

// Production Code Splitting: Lazy-load below-the-fold sections
const EventDetailsSection = lazy(() => import('./components/EventDetailsSection'));
const WishesSection = lazy(() => import('./components/WishesSection'));
const ClosingSection = lazy(() => import('./components/ClosingSection'));

export default function App() {
  return (
    <div className="invitation-app">
      {/* Section 1: Opening Screen / S & N Monogram Reveal & Doors */}
      <OpeningScreen />

      {/* Floating Circular Background Music Player */}
      <FloatingMusicPlayer />

      {/* Main Invitation Sections */}
      <main>
        {/* Editorial Ceremony Announcement & Integrated Countdown */}
        <AnnouncementSection />

        {/* Below-the-fold sections with lightweight Suspense boundaries */}
        <Suspense fallback={null}>
          <EventDetailsSection />
          <WishesSection />
          <ClosingSection />
        </Suspense>
      </main>
    </div>
  );
}
