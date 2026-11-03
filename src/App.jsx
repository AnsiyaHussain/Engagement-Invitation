import { useState } from 'react';
import OuterFrame from './components/OuterFrame';
import PetalShower from './components/PetalShower';
import NavDots from './components/NavDots';
import OpeningScreen from './components/OpeningScreen';
import AnnouncementSection from './components/AnnouncementSection';
import DetailsSection from './components/DetailsSection';
import WishesSheet from './components/WishesSheet';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';

export default function App() {
  const [isWishesOpen, setIsWishesOpen] = useState(false);

  return (
    <div className="invitation-app">
      {/* Fixed Luxury Champagne-Gold Outer Frame with Diamond Corners */}
      <OuterFrame />

      {/* Gentle Floating Falling Petals Canvas */}
      <PetalShower />

      {/* Two-Page Indicator Navigation Dots */}
      <NavDots />

      {/* Full-Screen Opening Doors & Monogram with 2 Interlocking Rings */}
      <OpeningScreen />

      {/* Floating Music Player */}
      <FloatingMusicPlayer />

      {/* Main Invitation Sections */}
      <div className="pages-scroll-container">
        {/* Page 1: Ceremony Announcement, Ansiya & Nihal with 2 Rings, Countdown */}
        <AnnouncementSection />

        {/* Page 2: Quran Verse, Families, Venue, Directions & Wishes Buttons */}
        <DetailsSection onOpenWishes={() => setIsWishesOpen(true)} />
      </div>

      {/* Interactive Slide-Up Wishes Sheet */}
      <WishesSheet
        isOpen={isWishesOpen}
        onClose={() => setIsWishesOpen(false)}
      />
    </div>
  );
}
