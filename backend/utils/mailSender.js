// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: prosecc.env.MAIL_HOST,
//       auth: {
//         user: prosecc.env.MAIL_USER,
//         pass: prosecc.env.MAIL_PASS,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: "StudyNotion || codehelp  -by  Babbar",
//       to: `${email}`,
//       subject: `${title}`,
//       htmt: `${body}`,
//     });
//     console.log(info);
//     return info;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// module.exports = mailSender;


const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("MAIL_USER or MAIL_PASS is missing in backend .env");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.MAIL_PORT || 465),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: `"Pankaj - StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent:", info.response);
    return info;
  } catch (error) {
    console.log("Error in mailSender:", error);
    throw error;
  }
};

module.exports = mailSender;
