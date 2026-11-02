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
  venueAddress: "Follow the Google Maps directions link below for exact location & route",
  
  // Confirmed Google venue link provided by the couple
  googleMapsUrl: "https://share.google/kkqEvfza5XU5Qf5yK",

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
