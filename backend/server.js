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
const { MONGO_URI, EMAIL_USER, EMAIL_PASS, NODE_ENV, PORT } = process.env;

if (!MONGO_URI || !EMAIL_USER || !EMAIL_PASS) {
  console.error("❌ FATAL ERROR: Missing essential environment variables (MONGO_URI, EMAIL_USER, EMAIL_PASS)");
  process.exit(1); // Exit the app if critical config is missing
}

const app = express();

// --- Security Middleware (Additions) ---

// 1. Set various HTTP security headers
app.use(helmet());

// 2. Configure CORS securely for production
const allowedOrigins = [
  'http://localhost:5173', // Your local dev environment
  'https://tmc-plastics.vercel.app', // Your production frontend URL
  'https://www.tmcplastics.com' // Your custom domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// 3. Use body-parser (which you already have)
app.use(bodyParser.json());

// 4. Rate Limiting to prevent brute-force/spam attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all API routes
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
    pass: EMAIL_PASS, // Use the App Password if 2FA is enabled
  },
});

// --- API Routes ---

// This route saves a full contact message and notifies admin
app.post("/api/contact", async (req, res) => {
  console.log("📩 Received contact data:", req.body);
  try {
    // Save to MongoDB
    const contact = new Contact(req.body);
    await contact.save();

    // Prepare email content
    const mailOptions = {
      from: EMAIL_USER,
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


// This route sends a quote email to the user and notifies admin
app.post("/api/send-quote", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // 1. Email to the user
    const mailOptions = {
      from: `"TMC Plastics" <${EMAIL_USER}>`, // Set a "From" name
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

    // 2. Notification email to you (admin)
    const notifyAdmin = {
      from: `"Server Notifier" <${EMAIL_USER}>`,
      to: "plastictmc@gmail.com",
      subject: `New Sustainability Quote Request`,
      html: `
        <h3>New Quote Request Received</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>The user has requested a sustainability quote. An automated confirmation has been sent to them.</p>
      `,
    };
    await transporter.sendMail(notifyAdmin);

    res.status(200).json({ message: "Quote sent successfully!" });
  } catch (error) {
    console.error("Error sending quote:", error);
    res.status(500).json({ message: "Failed to send quote. Please try again later." });
  }
});

// --- Start Server ---
const port = PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});