/**
 * ====================================================================
 * ENGAGEMENT INVITATION CONFIGURATION
 * ====================================================================
 * Customized for Ansiya (Ansiya Hussain) & Nihal
 * Edit names, families, verses, date, venue and links here.
 */

const MUSIC_TRACK = {
  title: "Love Story – Indila (Piano Cover)",
  src: `${import.meta.env.BASE_URL}audio/music-1.mp3`,
};

export const INVITATION_CONFIG = {
  // --- Couple Details ---
  brideName: "Ansiya Hussain",
  brideShortName: "Ansiya",
  groomName: "Nihal",
  monogramBride: "A",
  monogramGroom: "N",

  // --- Event Details ---
eventTitle: "Engagement Ceremony",
blessingIntro: "Together with our families we cordially invite you to our engagement",
invitationNote: "We would be delighted to have you join us on our special day.",

  // --- Date & Time ---
  dateDisplay: "Sunday, 29 November 2026",
  timeDisplay: "5:00 PM – 7:00 PM · MANKARA FARMS",
  timeOnlyDisplay: "5:00 PM – 7:00 PM",
  timezoneDisplay: "India Standard Time (IST)",

  // Target timestamp for accurate live countdown in Asia/Kolkata (UTC+05:30)
  targetDateISO: "2026-11-29T17:00:00+05:30",

  // --- Venue & Directions ---
  venueName: "Mankara Farms",
  venueAddress: "Puthenchira PO, near Thachapilly Bridge\nKombathukadavu, Thrissur, Kerala 680682",
  venueAddressLine1: "Puthenchira PO, near Thachapilly Bridge",
  venueAddressLine2: "Kombathukadavu, Thrissur, Kerala 680682",

  // Confirmed Google venue link provided by the couple
  googleMapsUrl: "https://www.google.com/maps/dir//Mankara+Farms,+Puthenchira+PO+Near+Thachapilly+Bridge+Kombathukadavu,+Kombathukadavu-Kodungallur+Rd,+Thrissur,+Keralam+680682/@10.2702703,76.2303966,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b081de8c40016d1:0x61f652e8a4e5933f!2m2!1d76.229662!2d10.2419542?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D",

  // --- Islamic Text ---
  bismillah: {
    // arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    english: "N THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL",
  },
  verse: {
    arabic: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
    english: "And We created you in pairs.",
    reference: "SURAH AN-NABA · 78:8",
  },
  blessingDua: {
    // arabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  },

  // --- Families ---
  families: {
    heading: "TOGETHER WITH THEIR FAMILIES",
    bride: {
      name: "Ansiya Hussain",
      relation: "daughter of",
      parents: "Hussain & Fathima Beevi",
    },
    groom: {
      name: "Nihal",
      grandRelation: "grandson of",
      grandparents: "Late Sunnasahib, Ex. MP & Pyarijan",
      parentRelation: "son of",
      parents: "Ullas & Gulrukh",
    },
  },

  // --- Music Configuration ---
  music: {
    tracks: [MUSIC_TRACK],
    audioSrc: MUSIC_TRACK.src,
    trackTitle: MUSIC_TRACK.title,
    defaultVolume: 0.3,
  },

  // --- Closing Section ---
  closing: {
    farewell: "Jazakallahu khairan · Ansiya & Nihal",
  },
};
