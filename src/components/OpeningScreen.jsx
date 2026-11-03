import { useState, useEffect } from 'react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { audioManager } from '../utils/audioManager';

export default function OpeningScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [doorsActive, setDoorsActive] = useState(true);

  useEffect(() => {
    // Body scrolling stays locked until the tap
    document.body.classList.add('locked');
    return () => {
      document.body.classList.remove('locked');
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // If site has background music, start it inside tap handler (user gesture), never before
    try {
      audioManager.play();
    } catch {
      // Audio autoplay fallback
    }

    // Unlock body scrolling and trigger orchestrated reveal
    document.body.classList.remove('locked');
    document.body.classList.add('opened', 'go');

    // After the 1.9s slide animation completes, remove pointer-events so page is usable
    setTimeout(() => {
      setDoorsActive(false);
    }, 2100);
  };

  return (
    <>
      {/* Two door panels (left & right) sliding outward on tap */}
      <div
        id="doors"
        className={`doors ${doorsActive ? 'active' : ''} ${isOpen ? 'open' : ''}`}
        aria-hidden="true"
      >
        <div className="door l" />
        <div className="door r" />
      </div>

      {/* First Screen: Monogram + Tap To Open */}
      <div id="seal" className={`seal ${isOpen ? 'gone' : ''}`}>
        <button
          type="button"
          id="openBtn"
          aria-label="Open the invitation"
          onClick={handleOpen}
        >
          <div className="ar bis" lang="ar" dir="rtl">
            {INVITATION_CONFIG.bismillah.arabic}
          </div>
          <div className="ring">
            <span>
              {INVITATION_CONFIG.monogramBride}
              <i>&amp;</i>
              {INVITATION_CONFIG.monogramGroom}
            </span>
          </div>
          <div className="tap">Tap to open</div>
        </button>
      </div>
    </>
  );
}
