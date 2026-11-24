const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Service price is required']
  },
  tagline: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Bespoke'
  },
  features: [{
    type: String
  }],
  badge: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
