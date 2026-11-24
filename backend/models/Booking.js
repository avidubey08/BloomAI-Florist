const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Consultation or delivery date is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    default: ''
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'completed', 'cancelled']
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
