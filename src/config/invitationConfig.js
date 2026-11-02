/**
 * ====================================================================
 * WEDDING / ENGAGEMENT INVITATION CONFIGURATION
 * ====================================================================
 * Customized for Siya & Nihal
 */

export const INVITATION_CONFIG = {
  // --- Couple Details ---
  brideName: "Siya",
  groomName: "Nihal",
  monogram: "S & N", // Monogram initials for crests and header

  // --- Event Details ---
  eventTitle: "Engagement Ceremony",
  subTitle: "Two Hearts, One Beautiful Beginning",
  blessingHeader: "With the blessings of our families",
  invitationCallout: "We joyfully invite you to celebrate our engagement",

  // --- Date & Time ---
  dateDisplay: "Sunday, 29 November 2026",
  timeDisplay: "5:00 PM – 7:00 PM",
  timezoneDisplay: "India Standard Time (IST)",
  
  // Target timestamp for accurate live countdown in Asia/Kolkata (UTC+05:30)
  targetDateISO: "2026-11-29T17:00:00+05:30",

  // --- Venue & Directions ---
  venueName: "Mankara Farms",
  venueAddress: "Puthenchira PO, Near Thachapilly Bridge, Kombathukadavu, Thrissur, Kerala 680682",
  
  // Confirmed Google venue link provided by the couple
  googleMapsUrl: "https://www.google.com/maps/dir//Mankara+Farms,+Puthenchira+PO+Near+Thachapilly+Bridge+Kombathukadavu,+Kombathukadavu-Kodungallur+Rd,+Thrissur,+Keralam+680682/@10.2702703,76.2303966,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b081de8c40016d1:0x61f652e8a4e5933f!2m2!1d76.229662!2d10.2419542?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D",

  // --- Image Asset & Cute Top Caption ---
  portraitImageSrc: "./images/couple-portrait.jpg",
  portraitTopCaption: "Yes, these kids are getting engaged!",

  // --- Music Configuration ---
  music: {
    trackTitle: "Romantic Piano Serenade",
    artist: "Acoustic Melody",
    audioSrc: "./audio/romantic-ambient.mp3",
    defaultVolume: 0.28,
    useSynthesizedFallback: true // Built-in Web Audio API romantic chords
  },

  // --- Closing Section ---
  closing: {
    title: "With Love, We Invite You to Be Part of Our Special Day",
    dateSummary: "29 November 2026 | 5:00 PM – 7:00 PM",
    farewell: "Your presence, love, and blessings will make our celebration complete."
  }
};
