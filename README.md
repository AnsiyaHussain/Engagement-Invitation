# Engagement-Invitation

> **Two Hearts, One Beautiful Beginning**  
> An elegant, minimal, luxury editorial digital engagement invitation microsite for **Ansiya & Nihal**.

---

## 💍 Highlights & Features

- **A & N Monogram Opening Screen**: 132px gold outlined circle with a 4.5s breathing animation. When tapped, two paper-colored door panels open outward via a 1.9s cubic-bezier transition, starting background music and revealing the invitation.
- **Pure Editorial Typography**: High-end minimalist design using *Cormorant Garamond* and *Jost* typography, fine gold hairlines, and negative space with zero image dependencies.
- **Strict 5-Color Luxury Palette**: `--ivory: #F8F3ED`, `--paper: #FDFBF7`, `--ink: #4A3730`, `--gold: #A8833F`, `--line: #E6D9C3`.
- **Heartfelt Invitation Message**: *"Your presence and blessings will make this special occasion even more beautiful."*
- **Accurate Live Countdown**: Real-time ticker calculating down to **Sunday, 29 November 2026, 5:00 PM IST** (Asia/Kolkata timezone: `UTC+05:30`).
- **Event Location & Navigation**: **Mankara Farms** event card with a direct link to Google Maps directions and 1-click Google Calendar sync / RSVP.
- **Circular Audio Player**: Minimalist 44px outlined circle with play/pause and volume controls, with Web Audio API synthesizer fallback.
- **Interactive Blessings Guestbook**: Express API backend (`/api/wishes`) with validation, anti-spam honeypot, and celebratory confetti.
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
- **Styling**: Minimal Luxury Editorial Design System (Ivory `#F8F3ED`, Paper `#FDFBF7`, Ink `#4A3730`, Gold `#A8833F`, Line `#E6D9C3`)
- **Backend**: Node.js & Express.js REST API with file persistence
