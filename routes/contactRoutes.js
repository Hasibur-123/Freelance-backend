const express = require('express');
const router = express.Router();

const { sendContact, getLeads } = require('../controllers/contactController');

// Routes
router.post('/contact', sendContact);
router.get('/leads', getLeads);

// ✅ Reply Route
router.post('/reply', async (req, res) => {
  const { toEmail, subject, message } = req.body;

  try {
    const transporter = require('nodemailer').createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS
      }
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: toEmail,
      subject: subject || 'Reply from Hasibur',
      text: message
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Reply sent successfully' });
  } catch (err) {
    console.error('Reply Email Error:', err);
    res.status(500).json({ success: false, message: 'Failed to send reply' });
  }
});

module.exports = router;
