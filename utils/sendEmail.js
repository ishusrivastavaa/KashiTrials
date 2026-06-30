const nodemailer = require('nodemailer');

/**
 * Helper to send email notification using Nodemailer
 * @param {Object} options - Email options
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML text content
 */
const sendEmail = async (options) => {
  const mailOptions = {
    from: `"KashiTrails Concierge" <${process.env.SMTP_USER || 'system@kashitrails.com'}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL || 'YOUR_EMAIL_ADDRESS',
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // If SMTP configurations are placeholder values, mock the email dispatch in dev mode
  if (
    process.env.NODE_ENV !== 'production' &&
    (process.env.SMTP_USER === 'your-email@gmail.com' ||
      !process.env.SMTP_USER ||
      process.env.SMTP_PASS === 'your-app-password')
  ) {
    console.log('\n--- DEVELOPMENT MOCK EMAIL MODE ---');
    console.log(`To: ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Body (Plain Text):\n${mailOptions.text}`);
    console.log('------------------------------------\n');
    return { messageId: 'mock-id-12345' };
  }

  // Config transporter using SMTP env settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email notification sent successfully: ${info.messageId}`);
};

/**
 * Format and send KashiTrails tour inquiry email
 * @param {Object} inquiry - The saved Mongoose inquiry document
 */
const sendInquiryEmail = async (inquiry) => {
  const formattedCreatedAt = new Date(inquiry.createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });
  
  const formattedTravelDate = new Date(inquiry.travelDate).toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
  });

  // Plain text email matching requirements exactly
  const textBody = `New Tour Inquiry

Name:
${inquiry.name}

Email:
${inquiry.email}

Phone:
${inquiry.phone}

Number of Travelers:
${inquiry.travelers}

Travel Date:
${formattedTravelDate}

Submitted At:
${formattedCreatedAt}`;

  // Premium, professionally designed responsive HTML email body
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Tour Inquiry – KashiTrails</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f7f9fc;
          margin: 0;
          padding: 20px;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid #e1e8ed;
        }
        .header {
          background: linear-gradient(135deg, #800000 0%, #cc3333 100%);
          color: #ffffff;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .header p {
          margin: 5px 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 30px 25px;
        }
        .intro-text {
          font-size: 16px;
          line-height: 1.6;
          color: #555555;
          margin-bottom: 25px;
          border-bottom: 1px solid #eeeeee;
          padding-bottom: 15px;
        }
        .detail-row {
          display: flex;
          margin-bottom: 18px;
          border-bottom: 1px solid #fafafa;
          padding-bottom: 10px;
        }
        .detail-label {
          width: 35%;
          font-weight: 600;
          color: #800000;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .detail-value {
          width: 65%;
          font-size: 15px;
          color: #2c3e50;
          word-break: break-word;
        }
        .footer {
          background-color: #f7f9fc;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #7f8c8d;
          border-top: 1px solid #eeeeee;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Tour Inquiry</h1>
          <p>KashiTrails Premium Concierge</p>
        </div>
        <div class="content">
          <p class="intro-text">A new luxury pilgrimage booking request has been submitted through the website. Below are the traveler details:</p>
          
          <div class="detail-row">
            <div class="detail-label">Name</div>
            <div class="detail-value">${inquiry.name}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Email</div>
            <div class="detail-value"><a href="mailto:${inquiry.email}" style="color: #cc3333; text-decoration: none;">${inquiry.email}</a></div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Phone</div>
            <div class="detail-value"><a href="tel:${inquiry.phone}" style="color: #cc3333; text-decoration: none;">${inquiry.phone}</a></div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Travelers</div>
            <div class="detail-value"><strong>${inquiry.travelers}</strong> traveler(s)</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Travel Date</div>
            <div class="detail-value">${formattedTravelDate}</div>
          </div>
          
          <div class="detail-row" style="border-bottom: none;">
            <div class="detail-label">Submitted At</div>
            <div class="detail-value">${formattedCreatedAt}</div>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2026 KashiTrails. All rights reserved.</p>
          <p>This is an automated notification. Please reply directly to the customer's email address if needed.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    subject: 'New Tour Inquiry – KashiTrails',
    text: textBody,
    html: htmlBody,
  });
};

module.exports = {
  sendEmail,
  sendInquiryEmail,
};
