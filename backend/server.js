import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import sgMail from "@sendgrid/mail";
import Contact from "./models/contact.js";

dotenv.config();

const { MONGO_URI, EMAIL_USER, SENDGRID_API_KEY,PORT } = process.env;

if (!MONGO_URI || !EMAIL_USER || !SENDGRID_API_KEY) {
  console.error("❌ FATAL ERROR: Missing environment variables (MONGO_URI, EMAIL_USER, SENDGRID_API_KEY)");
  process.exit(1);
}

const app = express();
app.set('trust proxy', 1); // rate-limit ke liye zaroori

// --- Security Middleware (Additions) ---
app.use(helmet());

// 2. Configure CORS securely for production
const allowedOrigins = [
  'http://localhost:5173',
  'https://tmc-plastics-lt7p.vercel.app', // Aapka Vercel URL
  'https://www.tmcplastics.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());

// 4. Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
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

// 3. Nodemailer transporter ko HATA DEIN
// const transporter = nodemailer.createTransport({ ... });

// 4. SendGrid API Key set karein
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// --- API Routes ---

app.post("/api/contact", async (req, res) => {
  console.log("📩 Received contact data:", req.body);
  try {
    const contact = new Contact(req.body);
    await contact.save();

    const mailOptions = {
      from: EMAIL_USER, // Verified email
      to: "plastictmc@gmail.com",
      subject: `New Inquiry from ${req.body.name}`,
      html: `... (Aapka HTML content) ...`,
    };

    // 5. transporter.sendMail ki jaga sgMail.send istemal karein
    await sgMail.send(mailOptions);

    res.status(200).json({ message: "Submitted successfully!" });
  } catch (error) {
    console.error("Error sending contact email:", error.response?.body || error);
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
      from: `"TMC Plastics" <${EMAIL_USER}>`,
      to: email,
      subject: "Your Sustainability Quote - TMC Plastics 🌿",
      html: `... (Aapka HTML content) ...`,
    };
    // 6. transporter.sendMail ki jaga sgMail.send istemal karein
    await sgMail.send(mailOptions);

    const notifyAdmin = {
      from: `"Server Notifier" <${EMAIL_USER}>`,
      to: "plastictmc@gmail.com",
      subject: `New Sustainability Quote Request`,
      html: `... (Aapka HTML content) ...`,
    };
    // 7. transporter.sendMail ki jaga sgMail.send istemal karein
    await sgMail.send(notifyAdmin);

    res.status(200).json({ message: "Quote sent successfully!" });
  } catch (error) {
    // 8. Behtar error logging
    console.error("Error sending quote:", error.response?.body || error);
    res.status(500).json({ message: "Failed to send quote. Please try again later." });
  }
});

// --- Start Server ---
const port = PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});