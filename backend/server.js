import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import helmet from "helmet"; // <-- ADDITION: For security headers
import rateLimit from "express-rate-limit"; // <-- ADDITION: For rate limiting
import Contact from "./models/contact.js";

dotenv.config();

// --- Check for essential environment variables ---
// 🛑 REMOVED 'PORT' CHECK - Vercel handles this automatically.
const { MONGO_URI, EMAIL_USER, EMAIL_PASS, NODE_ENV } = process.env;

if (!MONGO_URI || !EMAIL_USER || !EMAIL_PASS) {
  console.error("❌ FATAL ERROR: Missing essential environment variables (MONGO_URI, EMAIL_USER, EMAIL_PASS)");
  // On Vercel, this will cause the function to fail, which is correct.
  // We don't 'process.exit' on serverless.
}

const app = express();

// --- Security Middleware (Additions) ---
app.use(helmet());

// 2. Configure CORS securely for production
const allowedOrigins = [
  'http://localhost:5173', // Your local dev environment
  'https://tmc-plastics.vercel.app', // CHANGE this to your Vercel URL
  'https://www.tmcplastics.com' // Your custom domain
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  }
}));

app.use(bodyParser.json());

// 4. Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", apiLimiter);

// --- End of Security Middleware ---

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// --- API Routes ---

// This route saves a full contact message and notifies admin
app.post("/api/contact", async (req, res) => {
  console.log("📩 Received contact data:", req.body);
  try {
    const contact = new Contact(req.body);
    await contact.save();

    const mailOptions = {
      from: EMAIL_USER,
      to: "plastictmc@gmail.com",
      subject: `New Inquiry from ${req.body.name}`,
      html: `...`, // Your HTML content
    };
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

// This route sends a quote email to the user and notifies admin
app.post("/api/send-quote", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }
  try {
    // 1. Email to the user
    const mailOptions = {
      from: `"TMC Plastics" <${EMAIL_USER}>`,
      to: email,
      subject: "Your Sustainability Quote - TMC Plastics 🌿",
      html: `...`, // Your HTML content
    };
    await transporter.sendMail(mailOptions);

    // 2. Notification email to you (admin)
    const notifyAdmin = {
      from: `"Server Notifier" <${EMAIL_USER}>`,
      to: "plastictmc@gmail.com",
      subject: `New Sustainability Quote Request`,
      html: `...`, // Your HTML content
    };
    await transporter.sendMail(notifyAdmin);

    res.status(200).json({ message: "Quote sent successfully!" });
  } catch (error) {
    console.error("Error sending quote:", error);
    res.status(500).json({ message: "Failed to send quote. Please try again later." });
  }
});


export default app;