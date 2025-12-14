const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

// --- SCHEMAS (Data Models) ---
const AnnouncementSchema = new mongoose.Schema({
  title: String,
  date: String,
  type: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});
const Announcement = mongoose.model("Announcement", AnnouncementSchema);

const ContactSchema = new mongoose.Schema({
  email: String,
  type: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", ContactSchema);

const AdminSchema = new mongoose.Schema({
  hash: String,
});
const Admin = mongoose.model("Admin", AdminSchema);

// --- CLOUDINARY CONFIG ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- MULTER STORAGE ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "fiestron-gallery",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});
const upload = multer({ storage: storage });

// index.js inside gallerySchema
const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String },

  studentName: { type: String, default: "Anonymous" },
  college: { type: String, default: "KC College" },
  contingentName: { type: String, default: "GENERAL" },

  // --- FIX: Enum removed so custom categories work ---
  eventCategory: {
    type: String,
    default: "GENERAL",
  },
  // --------------------------------------------------

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  timestamp: { type: Date, default: Date.now },
});

const GalleryItem = mongoose.model("GalleryItem", gallerySchema);

// --- API ROUTES ---

// 1. GET Announcements
app.get("/api/announcements", async (req, res) => {
  await connectDB();
  try {
    const data = await Announcement.find().sort({ createdAt: -1 });
    const formatted = data.map((item) => ({
      id: item._id,
      ...item._doc,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 2. POST Announcement (Admin)
app.post("/api/announcements", async (req, res) => {
  await connectDB();
  try {
    const { title, type, content, password } = req.body;

    // --- EMERGENCY FIX: Hardcoded Password ---
    if (password !== "passwordForDashboard") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // -----------------------------------------

    const date = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const newAnnouncement = await Announcement.create({
      title,
      date,
      type,
      content,
    });
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ error: "Could not save" });
  }
});

// 3. POST Contact
app.post("/api/contact", async (req, res) => {
  await connectDB();
  try {
    await Contact.create(req.body);
    res.status(201).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

// Upload Route
app.post("/api/upload-gallery", upload.single("image"), async (req, res) => {
  await connectDB();
  try {
    const newItem = new GalleryItem({
      imageUrl: req.file.path,
      publicId: req.file.filename,

      // Capturing Frontend Data
      studentName: req.body.studentName || "Anonymous",
      college: req.body.college || "Unknown",
      contingentName: req.body.contingentName
        ? req.body.contingentName.toUpperCase()
        : "GENERAL",
      eventCategory: req.body.eventCategory || "GENERAL",

      status: "pending",
    });

    await newItem.save();
    res
      .status(200)
      .json({ success: true, message: "Uploaded! Sent for approval." });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed." });
  }
});

// Get Photos Route
app.get("/api/gallery-public", async (req, res) => {
  await connectDB();
  try {
    const photos = await GalleryItem.find({ status: "approved" }).sort({
      timestamp: -1,
    });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

// --- ADMIN ROUTE TO APPROVE/REJECT PHOTOS ---
app.put("/api/admin/update-status", async (req, res) => {
  await connectDB();
  try {
    const { photoId, action, password } = req.body;

    // --- EMERGENCY FIX: Hardcoded Password ---
    if (password !== "passwordForDashboard") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // -----------------------------------------

    if (!["approved", "rejected", "pending"].includes(action)) {
      return res.status(400).json({ error: "Invalid action" });
    }

    const updatedPhoto = await GalleryItem.findByIdAndUpdate(
      photoId,
      { status: action },
      { new: true }
    );

    if (!updatedPhoto)
      return res.status(404).json({ error: "Photo not found" });

    res.json({
      success: true,
      message: `Photo marked as ${action}`,
      data: updatedPhoto,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// --- ADMIN ROUTE TO SEE PENDING REQUESTS ---
app.post("/api/admin/pending-photos", async (req, res) => {
  await connectDB();
  try {
    const { password } = req.body;

    // --- EMERGENCY FIX: Hardcoded Password ---
    if (password !== "passwordForDashboard") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // -----------------------------------------

    // Fetch all pending photos
    const pendingPhotos = await GalleryItem.find({ status: "pending" }).sort({
      timestamp: -1,
    });
    res.json(pendingPhotos);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
