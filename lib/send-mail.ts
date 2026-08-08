"use server";
import { formatError } from "@/lib/utils";
import { ActionResultMessage } from "@/types";
import nodemailer from "nodemailer";
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const NODEMAILER_USER =
  process.env.NODEMAILER_USER || "ctcomp-expense-app@cjplabs.com";
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

const mailOptions = {
  from: NODEMAILER_USER,
  to: "test@cjplabs.com",
};

export async function sendMail(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResultMessage> {
  try {
    const isVerified = await transporter.verify();
    if (!isVerified) throw new Error("Error verifying credentials!");
    const data = {
      player1: formData.get("player1") || "",
      player2: formData.get("player2") || "",
      player3: formData.get("player3") || "",
      player4: formData.get("player4") || "",
      comment: formData.get("comment") || "",
    };

    await transporter.sendMail({
      ...mailOptions,
      subject: "Beaver Point Event Registration Form",
      text: `Player Registration\nPlayer 1: ${data.player1}\nPlayer 2: ${data.player2}\nPlayer 3: ${data.player3}\nPlayer 4: ${data.player4}n\nComment: ${data.comment}`,
      html: `<h1>Player Registration</h1><p>Player 1: ${data.player1}</p><p>Player 2: ${data.player2}</p><p>Player 3: ${data.player3}</p><p>Player 4: ${data.player4}</p><p>Comment: ${data.comment}</p>`,
    });
    return {
      success: true,
      message: "Email sent!",
    };
  } catch (err) {
    return {
      success: false,
      message: `Error sending email! \n${formatError(err)}`,
    };
  }
}
