import { useState, useEffect } from 'react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { audioManager } from '../utils/audioManager';

export default function OpeningScreen({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [doorsActive, setDoorsActive] = useState(true);

  useEffect(() => {
    // Body scrolling stays locked until the visitor taps to open
    document.body.classList.add('locked');
    return () => {
      document.body.classList.remove('locked');
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;

    // Start background music seamlessly
    audioManager.play(INVITATION_CONFIG.music.audioSrc);
    setIsOpen(true);
    if (onOpen) onOpen();

    // Trigger door opening and orchestrated letter-by-letter reveal
    document.body.classList.remove('locked');
    document.body.classList.add('opened', 'go');

    // After the 1.9s slide animation completes, remove pointer events
    setTimeout(() => {
      setDoorsActive(false);
    }, 2100);
  };

  return (
    <>
      {/* Two Deep Burgundy Door Panels sliding outwards */}
      <div
        id="doors"
        className={`doors ${doorsActive ? 'active' : ''} ${isOpen ? 'open' : ''}`}
        aria-hidden="true"
      >
        <div className="door l" />
        <div className="door r" />
      </div>

      {/* Centered Circular Monogram Seal + Tap To Open */}
      <div id="seal" className={`seal ${isOpen ? 'gone' : ''}`}>
        <button
          type="button"
          id="openBtn"
          aria-label="Open the engagement invitation"
          onClick={handleOpen}
        >
          {/* Gold Arabic Bismillah */}
          <div className="ar seal-bis" lang="ar" dir="rtl">
            {INVITATION_CONFIG.bismillah.arabic}
          </div>

          {/* Centered Monogram Ring with A, 2 Interlocking Rings, and N */}
          <div className="ring">
            <span className="ring-content">
              <span>{INVITATION_CONFIG.monogramBride}</span>
              <img
                src={`${import.meta.env.BASE_URL}images/rings-seal-gold.png`}
                alt="Interlocking Rings"
                className="monogram-rings"
                width={30}
                height={30}
              />
              <span>{INVITATION_CONFIG.monogramGroom}</span>
            </span>
          </div>

          {/* Tap to open text */}
          <div className="tap">TAP TO OPEN</div>
        </button>
      </div>
    </>
  );
}
