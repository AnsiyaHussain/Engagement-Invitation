/**
 * ====================================================================
 * ENGAGEMENT INVITATION CONFIGURATION
 * ====================================================================
 * Customized for Ansiya (Ansiya Hussain) & Nihal
 * Edit names, families, verses, date, venue and links here.
 */

export const INVITATION_CONFIG = {
  // --- Couple Details ---
  brideName: "Ansiya Hussain",     // full name (used in the families section)
  brideShortName: "Ansiya",          // name shown in the big animated title
  groomName: "Nihal",
  monogramBride: "A",              // letters inside the opening monogram
  monogramGroom: "N",

  // --- Event Details ---
  eventTitle: "Engagement Ceremony",
  blessingHeader: "With Allah's Blessings",
  invitationLines: ["Insha\u2019Allah, you are warmly invited", "to celebrate their engagement"],

  // Prominent heartfelt invitation message
  personalMessage: "Your presence and duas will make this special occasion even more beautiful.",

  // --- Date & Time ---
  dateDisplay: "Sunday, 29 November 2026",
  timeDisplay: "5:00 PM \u2013 7:00 PM",
  timezoneDisplay: "India Standard Time (IST)",

  // Target timestamp for accurate live countdown in Asia/Kolkata (UTC+05:30)
  targetDateISO: "2026-11-29T17:00:00+05:30",

  // --- Venue & Directions ---
  venueName: "Mankara Farms",
  venueAddress: "Puthenchira PO, Near Thachapilly Bridge, Kombathukadavu, Thrissur, Kerala 680682",

  // Confirmed Google venue link provided by the couple
  googleMapsUrl: "https://www.google.com/maps/dir//Mankara+Farms,+Puthenchira+PO+Near+Thachapilly+Bridge+Kombathukadavu,+Kombathukadavu-Kodungallur+Rd,+Thrissur,+Keralam+680682/@10.2702703,76.2303966,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b081de8c40016d1:0x61f652e8a4e5933f!2m2!1d76.229662!2d10.2419542?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D",

  // --- Islamic text (Arabic is rendered in the Amiri font, right-to-left) ---
  bismillah: {
    // arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    english: "In the name of Allah, the Most Gracious, the Most Merciful",
  },
  verse: {
    arabic: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
    english: "And We created you in pairs.",
    reference: "Surah An-Naba \u00b7 78:8",
  },
  blessingDua: {
    // arabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    // english: "May Allah bless you both, shower His blessings upon you, and unite you in goodness.",
  },
  closingVerse: {
    arabic: "وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    english: "Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us a leader for the righteous.",
    reference: "Surah Al-Furqan \u00b7 25:74",
  },

  // --- Families ---
  // For the groom, the grandparents are listed FIRST, then the parents.
  families: {
    heading: "Together with their families",
    bride: {
      name: "Ansiya Hussain",
      lineage: [
        { relation: "daughter of", people: ["Hussain", "Fathima Beevi"] },
      ],
    },
    groom: {
      name: "Nihal",
      lineage: [
        { relation: "grandson of", people: ["Late Sunnasahib, Ex. MP", "Pyarijan"] },
        { relation: "son of", people: ["Ullas", "Gulrukh"] },
      ],
    },
  },

  // --- Music Configuration ---
  music: {
    tracks: [
      { title: "Romantic Piano Serenade", src: "./audio/music-1.mp3" },
     
    ],
    defaultVolume: 0.28,
  },

  // --- Closing Section ---
  closing: {
    heading: "Jazakallahu Khairan",
    dateSummary: "Sunday \u00b7 29 November 2026",
    farewell: "Insha\u2019Allah, your presence and duas will make this special occasion even more beautiful."
  }
};
