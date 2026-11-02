# Engagement-Invitation

> **Two Hearts, One Beautiful Beginning**  
> A premium, animated digital engagement invitation microsite for **Siya & Nihal**.

---

## 💍 Highlights & Features

- **Wax Seal Opening Screen**: Interactive envelope reveal that unlocks the invitation and starts romantic background music upon visitor interaction.
- **Ceremony Announcement**: Elegant serif typography (*Playfair Display*, *Cormorant Garamond*, *Jost*, *Great Vibes*) with family blessings.
- **Full-Screen Portrait Presentation**: Displays the couple's portrait in its natural 599 × 1024 aspect ratio with uncropped framing and animated drifting flower petals (`PetalCanvas`).
- **Cute Blended Top Caption**: *"Yes, these kids are getting engaged!"* seamlessly overlaid in the studio space.
- **Accurate Live Countdown**: Real-time ticker calculating down to **Sunday, 29 November 2026, 5:00 PM IST** (Asia/Kolkata timezone: `UTC+05:30`).
- **Event Location & Navigation**: **Mankara Farms** event card with a direct link to Google Maps directions and 1-click Google Calendar sync.
- **Floating Romantic Audio Player**: Web Audio API romantic synthesizer engine fallback with play/pause and volume controls.
- **Interactive Wishes Guestbook**: Express API backend (`/api/wishes`) storing wishes with validation, anti-spam honeypot, and celebratory confetti animations.
- **Centralized Configuration**: All names, dates, venue, and links are easily editable in `src/config/invitationConfig.js`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
This runs both the Express backend server (port `5000`) and the Vite client (port `5173`) concurrently.

### 3. Build for Production
```bash
npm run build
```

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Framer Motion, Lucide React, Canvas Confetti
- **Styling**: Vanilla CSS Luxury Design System (Warm Ivory `#F8F3ED`, Espresso Brown `#50372F`, Antique Gold `#C6A36B`)
- **Backend**: Node.js & Express.js REST API with file persistence
