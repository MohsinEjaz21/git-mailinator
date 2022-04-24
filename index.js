"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

async function main() {

  console.log("process.env.GMAIL_USERNAME %j", process.env.GMAIL_USERNAME);
  console.log("process.env.GMAIL_PASSWORD %j", process.env.GMAIL_PASSWORD);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "mohsingdp@gmail.com, baz321@mailinator.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);