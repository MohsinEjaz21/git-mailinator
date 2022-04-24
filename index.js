"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();



async function main() {

  console.log("process.env", process.env);

  const getProps = () => {
    const { SENDER_FULLNAME, SENDER_EMAIL, SENDER_PASSWORD } = process.env
    const TOKEN = '123456789'

    return {
      SENDER: `${SENDER_FULLNAME} <${SENDER_EMAIL}>`,
      SENDER_EMAIL: SENDER_EMAIL,
      SENDER_PASSWORD: SENDER_PASSWORD,
      HOST: 'smtp.gmail.com',
      PORT: 465,
      SECURE: true,
      SUBJECT: 'Verify your Email 🌈',
      RECIEVERS: "mohsingdp@gmail.com, kamran17821@mailinator.com",
      HTML: `
      <h1>Verify your Email</h1>
      <p>
        Please click on the link to verify your email
        <a href="
        http://localhost:3000/verify?token=${TOKEN}
        ">Verify Email</a>
      </p>
      `
    }

  }

  let transporter = createTransporter(getProps());
  let info = await sendEmail(transporter, getProps());

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);



function createTransporter(props) {
  const { HOST, PORT, SENDER_EMAIL, SENDER_PASSWORD, SECURE } = props;
  return nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: SECURE,
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    },
  });
}

async function sendEmail(transporter, props) {
  const { SENDER, RECIEVERS, SUBJECT, HTML } = props;
  return await transporter.sendMail({
    from: SENDER,
    to: RECIEVERS,
    subject: SUBJECT,
    html: HTML,
  });
}
