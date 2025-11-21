const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const DATA_DIR = path.join(__dirname, 'data');
const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, 'announcements.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Middleware
app.use(cors()); // Allow your React app (on a different port) to access this API
app.use(express.json()); // Allows parsing JSON body data

// --- INITIALIZE DATA FILES (If they don't exist) ---
async function initializeData() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(ANNOUNCEMENTS_FILE);
  } catch {
    // If file doesn't exist, create it with an empty array
    await fs.writeFile(ANNOUNCEMENTS_FILE, '[]');
  }
  try {
    await fs.access(CONTACTS_FILE);
  } catch {
    // If file doesn't exist, create it with an empty array
    await fs.writeFile(CONTACTS_FILE, '[]');
  }
  console.log('✅ Data files initialized.');
}

// --- API ROUTES ---

// 1. ANNOUNCEMENTS API
// GET all announcements (READ)
app.get('/api/announcements', async (req, res) => {
  try {
    const data = await fs.readFile(ANNOUNCEMENTS_FILE, 'utf-8');
    const announcements = JSON.parse(data);
    // Sort by ID descending (newest first)
    res.json(announcements.sort((a, b) => b.id - a.id)); 
  } catch (err) {
    res.status(500).json({ message: 'Error reading announcements.' });
  }
});

// POST a new announcement (WRITE - for manual/admin use)
app.post('/api/announcements', async (req, res) => {
  try {
    const announcements = JSON.parse(await fs.readFile(ANNOUNCEMENTS_FILE, 'utf-8'));
    // Generate a new ID (simple counter based on current data)
    const newId = announcements.length > 0 ? announcements[0].id + 1 : 1; 
    
    // Format the date nicely for the frontend (e.g., "21 Nov 2025")
    const newAnnouncement = { 
        id: newId, 
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }), 
        ...req.body 
    };

    announcements.unshift(newAnnouncement); // Add to the start
    await fs.writeFile(ANNOUNCEMENTS_FILE, JSON.stringify(announcements, null, 2));

    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error('Error writing announcement:', err);
    res.status(500).json({ message: 'Could not save announcement.' });
  }
});


// 2. CONTACT/SPONSOR FORMS API
// POST a new form entry (WRITE)
app.post('/api/contact', async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile(CONTACTS_FILE, 'utf-8'));
    // Record submission timestamp and type
    const newEntry = { timestamp: new Date().toISOString(), type: 'Contact', ...req.body };
    
    contacts.push(newEntry);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

    res.status(201).json({ message: 'Form submitted successfully. We will be in touch.' });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({ message: 'Server error during submission.' });
  }
});

// GET all contact entries (for Admin access)
app.get('/api/contact', async (req, res) => {
    try {
        const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
        res.json(JSON.parse(data)); 
    } catch (err) {
        res.status(500).json({ message: 'Error reading contact entries.' });
    }
});


// --- SERVER START ---
const PORT = 5000;
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('Endpoints: /api/announcements, /api/contact');
  });
});