const Inquiry = require('../models/Inquiry');
const { sendInquiryEmail } = require('../utils/sendEmail');
const validator = require('validator');

/**
 * @desc    Submit a new booking/contact inquiry
 * @route   POST /api/inquiries
 * @access  Public
 */
exports.createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, travelers, travelDate } = req.body;

    // 1. Basic field presence validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }
    if (travelers === undefined || travelers === null) {
      return res.status(400).json({ success: false, message: 'Number of travelers is required' });
    }
    if (!travelDate) {
      return res.status(400).json({ success: false, message: 'Travel date is required' });
    }

    // 2. Format validations
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const phonePattern = /^\+?[0-9\s-]{10,15}$/;
    if (!phonePattern.test(phone.trim())) {
      return res.status(400).json({ success: false, message: 'Please enter a valid phone number (min 10 digits)' });
    }

    const parsedTravelers = parseInt(travelers, 10);
    if (isNaN(parsedTravelers) || parsedTravelers < 1) {
      return res.status(400).json({ success: false, message: 'Number of travelers must be a number of 1 or more' });
    }

    const parsedDate = new Date(travelDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid travel date' });
    }

    // Check if travel date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsedDate < today) {
      return res.status(400).json({ success: false, message: 'Travel date must be in the future' });
    }

    // 3. Save Inquiry to MongoDB
    const inquiry = new Inquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      travelers: parsedTravelers,
      travelDate: parsedDate,
    });

    const savedInquiry = await inquiry.save();

    // 4. Send email notification using Nodemailer helper
    // If SMTP is not configured or fails, we want the API to return an error, as per requirement 10:
    // "Return a success response to the frontend only after the inquiry has been successfully stored and the email has been sent."
    try {
      await sendInquiryEmail(savedInquiry);
    } catch (emailError) {
      console.error(`Email sending failed: ${emailError.message}`);
      // Rollback database record creation if email fails to keep database and email in sync?
      // Wait, requirement: "Return a success response to the frontend only after the inquiry has been successfully stored and the email has been sent."
      // If email fails, we should return a 500 error indicating email dispatch failed, and perhaps delete the saved database entry or keep it and report the error.
      // Usually, it's better to delete the failed inquiry or keep it but throw an error. Let's delete the database entry to guarantee that we "only return success after both succeed".
      await Inquiry.findByIdAndDelete(savedInquiry._id);
      return res.status(500).json({
        success: false,
        message: `Inquiry saved, but email notification failed. Rollback triggered. Details: ${emailError.message}`,
      });
    }

    // 5. Respond with success only after both operations succeed
    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been successfully submitted and the travel agent has been notified.',
      data: savedInquiry,
    });
  } catch (error) {
    // Pass general errors to the express error handler
    next(error);
  }
};
