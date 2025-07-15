const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');

const sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to MongoDB
    const newLead = new Lead({ name, email, message });
    await newLead.save();

    // Send Gmail alert
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent & saved.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leads.' });
  }
};

module.exports = { sendContact, getLeads };
