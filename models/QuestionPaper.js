const mongoose = require('mongoose');

const questionPaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: String,
    required: true,
    trim: true
  },
  fileURL: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    required: true
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('QuestionPaper', questionPaperSchema); 