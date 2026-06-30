const mongoose = require('mongoose');
const validator = require('validator');

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Please provide a valid email address',
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: (value) => {
          // Check if it matches a general phone pattern: digits, spaces, hyphens, plus signs
          return /^\+?[0-9\s-]{10,15}$/.test(value);
        },
        message: 'Please provide a valid phone number (min 10 digits)',
      },
    },
    travelers: {
      type: Number,
      required: [true, 'Number of travelers is required'],
      min: [1, 'Travelers must be at least 1'],
    },
    travelDate: {
      type: Date,
      required: [true, 'Preferred travel date is required'],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Inquiry', InquirySchema);
