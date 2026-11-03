import { useEffect, useState } from 'react';

/**
 * NavDots
 * Clean navigation indicator dots for Page 1 (#p1) and Page 2 (#p2).
 */
export default function NavDots() {
  const [activePage, setActivePage] = useState('p1');

  useEffect(() => {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    if (!p1 || !p2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePage(entry.target.id);
          }
        });
      },
      { threshold: 0.55 }
    );

    observer.observe(p1);
    observer.observe(p2);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="nv" aria-label="Pages">
      <a
        href="#p1"
        className={activePage === 'p1' ? 'c' : ''}
        aria-label="Invitation Announcement"
      />
      <a
        href="#p2"
        className={activePage === 'p2' ? 'c' : ''}
        aria-label="Ceremony Details & Families"
      />
    </nav>
  );
}

