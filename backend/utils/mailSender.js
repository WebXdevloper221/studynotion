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

    // CHECK ENV VARIABLES
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS:", process.env.MAIL_PASS);

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("MAIL_USER or MAIL_PASS is missing");
    }

    // CREATE TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    console.log("Transporter Created Successfully");

    // SEND MAIL
    const info = await transporter.sendMail({
      from: `StudyNotion <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail Sent Successfully");
    console.log(info.response);

    return info;

  } catch (error) {

    console.log("FULL MAIL ERROR:");
    console.log(error);

    throw error;
  }
};

module.exports = mailSender;
