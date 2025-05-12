const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const QuestionPaper = require('../models/QuestionPaper');
const cors = require('cors');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Get all question papers with optional filters
router.get('/', async (req, res) => {
  try {
    const { subject, semester } = req.query;
    const query = {};

    if (subject) query.subject = subject;
    if (semester) query.semester = semester;

    const papers = await QuestionPaper.find(query)
      .sort({ createdAt: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single question paper
router.get('/:id', async (req, res) => {
  try {
    const paper = await QuestionPaper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Question paper not found' });
    }
    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload a new question paper
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const { title, subject, semester } = req.body;
    const fileURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const paper = new QuestionPaper({
      title,
      subject,
      semester,
      fileURL,
      uploadedBy: req.user.email,
      downloads: 0
    });

    const savedPaper = await paper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Record a download
router.post('/:id/download', async (req, res) => {
  try {
    const paper = await QuestionPaper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Question paper not found' });
    }

    paper.downloads += 1;
    await paper.save();
    res.json({ message: 'Download recorded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 