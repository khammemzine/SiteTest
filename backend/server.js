const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// جلسات بسيطة مع خيارات للاستخدام عبر دومين/frontend
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'simple-site-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // يوم
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production' // يحتاج HTTPS
  }
}));

// مسارات
const authRoutes = require("./routes/auth");
const libraryRoutes = require("./routes/library");
const drawingsRoutes = require("./routes/drawings");

app.use("/auth", authRoutes);
app.use("/library", libraryRoutes);
app.use("/drawings", drawingsRoutes);

// مسار اختباري
app.get("/", (req, res) => {
  res.json({ message: "Simple-site backend running" });
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));