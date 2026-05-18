//  const express = require('express');

// const app = express();

// const userRoute = require("./routes/User");
// const profileRoute = require("./routes/Profile");
// const paymentRoute = require("./routes/Payment");
// const courseRoute = require("./routes/Course");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const {cloudinaryConnect} = require("./utils/imageUpload");
// require("dotenv").config();

// database.conect();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         Credentials:true

//     })
// )

// app.use(
//     fileUpload({
//         useTempFiles:true,
//         tempFileDir:"/tmp",
//     })
// )

// cloudinaryConnect();

// app.use("api/v1/auth", userRoute)
// app.use("api/v1/profile", profileRoute)
// app.use("api/v1/payment", paymentRoute)
// app.use("api/v1/course", courseRoute)


// app.length("/",(req ,res)=>{
//     return res.json({
//         success:true,
//         message:"your server is up and running......."
//     })
// })

// app.listen(PORT ,()=>{
//     console.log(`app is running at ${PORT}`)
// })


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
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

//database connect
async function startApp() {
  try {
    await database.connectDB();
  } catch (error) {
    console.error('Failed to start app because database connection failed.', error.message || error)
    process.exit(1)
  }

  //middlewares
  app.use(express.json());
  app.use(cookieParser());
 app.use(
  cors({
    origin: [
      "https://studynotion-alpha-five.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	next();
//   });
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);


// health routes
app.get(["/", "/api/v1"], (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
}

startApp().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
  })
})
