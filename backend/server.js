import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Contact from "./models/contact.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});



app.post("/api/contact", async (req, res) => {
  console.log("📩 Received contact data:", req.body);
  try {
    // Save to MongoDB
    const contact = new Contact(req.body);
    await contact.save();

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "plastictmc@gmail.com",
      subject: `New Inquiry from ${req.body.name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Company:</strong> ${req.body.company}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Country:</strong> ${req.body.country}</p>
        <p><strong>Message:</strong> ${req.body.message}</p>
        <hr />
        <p style="font-size: 12px; color: #777;">This message was also saved to MongoDB.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Submitted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(". ") });
    }
    res.status(500).json({ message: "Server error" });
  }
});



app.post("/api/send-quote", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // send to user
      subject: "Your Sustainability Quote - TMC Plastics 🌿",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color:#157347;">TMC Plastics - Sustainability Quote</h2>
          <p>Dear valued customer,</p>
          <p>Thank you for reaching out regarding our eco-friendly, sustainable packaging solutions.</p>
          <p>Our team will review your request and contact you shortly with a detailed quote.</p>
          <p>Meanwhile, feel free to explore our ongoing sustainability initiatives and green materials.</p>
          <p style="margin-top:20px;">Best regards,<br/><strong>TMC Plastics Team</strong><br/>plastictmc@gmail.com</p>
        </div>
      `,
    };

    
    await transporter.sendMail(mailOptions);

    
    const notifyAdmin = {
      from: process.env.EMAIL_USER,
      to: "plastictmc@gmail.com",
      subject: `New Sustainability Quote Request`,
      html: `
        <h3>New Quote Request Received</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>The user has requested a sustainability quote.</p>
      `,
    };
    await transporter.sendMail(notifyAdmin);

    res.status(200).json({ message: "Quote sent successfully!" });
  } catch (error) {
    console.error("Error sending quote:", error);
    res.status(500).json({ message: "Failed to send quote. Please try again later." });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
