const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Verified Customer'
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  occasion: {
    type: String,
    default: 'Luxury Floral Order'
  },
  avatar: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
