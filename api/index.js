const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const crypto = require('crypto');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// This connects to the MongoDB Cloud using your password
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

// --- SCHEMAS (Data Models) ---
const AnnouncementSchema = new mongoose.Schema({
  title: String,
  date: String,
  type: String, // 'important', 'update', etc.
  content: String,
  createdAt: { type: Date, default: Date.now }
});
const Announcement = mongoose.model('Announcement', AnnouncementSchema);

const ContactSchema = new mongoose.Schema({
  email: String,
  type: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', ContactSchema);

const AdminSchema = new mongoose.Schema({
  hash: String
});
const Admin = mongoose.model('Admin', AdminSchema);

// --- API ROUTES ---

// 1. GET Announcements
app.get('/api/announcements', async (req, res) => {
  await connectDB();
  try {
    // Get all announcements, sorted by newest first
    const data = await Announcement.find().sort({ createdAt: -1 });

    // Format the _id to be 'id' for the frontend
    const formatted = data.map(item => ({
      id: item._id,
      ...item._doc
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});


// 2. POST Announcement (For Admin Use)
app.post('/api/announcements', async (req, res) => {
  await connectDB();

  try {
    const { title, type, content, password } = req.body;
    if (!password) return res.status(400).json({ error: 'Password required' });

    // Hash the incoming password
    const incomingHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // Fetch admin stored hash
    const adminDoc = await Admin.findOne();
    if (!adminDoc) return res.status(500).json({ error: 'Admin not set up' });

    // Compare hashes
    if (incomingHash !== adminDoc.hash) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Create date string (unchanged)
    const date = new Date().toLocaleDateString(
      'en-US',
      { day: 'numeric', month: 'short', year: 'numeric' }
    );

    const newAnnouncement = await Announcement.create({
      title,
      date,
      type,
      content
    });

    res.status(201).json(newAnnouncement);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save' });
  }
});


// 3. POST Contact/Subscribe
app.post('/api/contact', async (req, res) => {
  await connectDB();
  try {
    await Contact.create(req.body);
    res.status(201).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;

// Always listen (Fixed for Render)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Export for Vercel (Optional, but safe to keep)
module.exports = app;

// Export for Vercel
module.exports = app;