import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'wishes.json');

app.use(cors());
app.use(express.json());

// Ensure data folder and storage file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed wishes to display beautiful greetings right away
const INITIAL_WISHES = [

];

function readWishes() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_WISHES, null, 2), 'utf-8');
      return INITIAL_WISHES;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading wishes file:", err);
    return INITIAL_WISHES;
  }
}

function writeWishes(wishes) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Error writing wishes file:", err);
    return false;
  }
}

// Simple in-memory rate limiter: max 5 requests per IP in 10 minutes
const ipRequestLogs = new Map();
function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 6;

  const userLogs = ipRequestLogs.get(ip) || [];
  const recentLogs = userLogs.filter(timestamp => now - timestamp < windowMs);

  if (recentLogs.length >= maxRequests) {
    return res.status(429).json({
      error: "Too many wishes submitted from this device. Please wait a few minutes before sharing more."
    });
  }

  recentLogs.push(now);
  ipRequestLogs.set(ip, recentLogs);
  next();
}

// Inappropriate words filter for automatic moderation
const BLOCKED_WORDS = [
  'spam', 'scam', 'viagra', 'casino', 'fuck', 'shit', 'bitch', 'asshole', 'idiot', 'stupid', 'hate'
];

function containsInappropriateContent(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some(word => lower.includes(word));
}

// GET /api/wishes - Fetch all approved wishes
app.get('/api/wishes', (req, res) => {
  const wishes = readWishes();
  // Only public approved wishes
  const publicWishes = wishes
    .filter(w => w.status === 'approved')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ wishes: publicWishes, total: publicWishes.length });
});

// POST /api/wishes - Submit a new wish
app.post('/api/wishes', rateLimiter, (req, res) => {
  const { name, message, relation = "Well-wisher", honeypot } = req.body;

  // Bot detection via honeypot
  if (honeypot && honeypot.trim() !== '') {
    // Silently return ok to fool bots
    return res.status(200).json({ success: true, message: "Wish received!" });
  }

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 60) {
    return res.status(400).json({ error: "Please enter a valid name (2 to 60 characters)." });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 300) {
    return res.status(400).json({ error: "Please write a wish between 5 and 300 characters." });
  }

  const cleanName = name.trim().slice(0, 60);
  const cleanMessage = message.trim().slice(0, 300);
  const cleanRelation = ['Family', 'Friend', 'Friends', 'Colleague', 'Well-wisher'].includes(relation)
    ? relation
    : 'Well-wisher';

  // Check content moderation
  const isFlagged = containsInappropriateContent(cleanName) || containsInappropriateContent(cleanMessage);

  const newWish = {
    id: `wish-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    name: cleanName,
    message: cleanMessage,
    relation: cleanRelation,
    createdAt: new Date().toISOString(),
    status: isFlagged ? 'pending' : 'approved' // Automatically put questionable content in pending review
  };

  const currentWishes = readWishes();
  currentWishes.unshift(newWish);
  writeWishes(currentWishes);

  res.status(201).json({
    success: true,
    wish: newWish.status === 'approved' ? newWish : null,
    message: isFlagged
      ? "Thank you! Your wish has been submitted and will appear after a brief review."
      : "Jazakallahu khairan for your duas and warm wishes!"
  });
});

// Admin moderation endpoint: GET /api/admin/wishes
app.get('/api/admin/wishes', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'invitation-secret-key-2026') {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  const wishes = readWishes();
  res.json({ wishes });
});

// Admin moderation endpoint: PATCH /api/admin/wishes/:id
app.patch('/api/admin/wishes/:id', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'invitation-secret-key-2026') {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'pending', 'rejected'].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const wishes = readWishes();
  const wish = wishes.find(w => w.id === id);
  if (!wish) {
    return res.status(404).json({ error: "Wish not found" });
  }

  wish.status = status;
  writeWishes(wishes);
  res.json({ success: true, wish });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Engagement Invitation Backend running on port ${PORT}`);
});
