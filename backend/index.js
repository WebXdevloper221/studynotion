const buffer = require("buffer");

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer;
}

if (typeof global.SlowBuffer === "undefined") {
  global.SlowBuffer = buffer.SlowBuffer;
}

const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Database connect
async function startApp() {
  try {
    await database.connectDB();
  } catch (error) {
    console.error(
      "Failed to start app because database connection failed.",
      error.message || error
    );
    process.exit(1);
  }

  // Middlewares
  app.use(express.json());
  app.use(cookieParser());

  // CORS FIX
  app.use(
    cors({
      origin: "https://studynotion-alpha-five.vercel.app",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp",
    })
  );

  // Cloudinary connection
  cloudinaryConnect();

  // Routes
  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/profile", profileRoutes);
  app.use("/api/v1/course", courseRoutes);
  app.use("/api/v1/payment", paymentRoutes);

  // Health route
  app.get(["/", "/api/v1"], (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running....",
    });
  });
}

startApp().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
});
