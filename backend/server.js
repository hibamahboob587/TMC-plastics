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

// 🟢 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✉️ Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // can change to outlook, yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // your sender email
    pass: process.env.EMAIL_PASS, // app password (NOT your real password)
  },
});

// 📨 POST endpoint for contact form
app.post("/api/contact", async (req, res) => {
  console.log("📩 Received data:", req.body);
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
