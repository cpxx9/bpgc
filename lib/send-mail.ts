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

export async function sendMail({
  subject,
  text,
  html,
}: {
  subject: string;
  text: string;
  html?: string;
}): Promise<ActionResultMessage> {
  try {
    const isVerified = await transporter.verify();
    if (!isVerified) throw new Error("Error verifying credentials!");

    await transporter.sendMail({
      ...mailOptions,
      subject,
      text,
      html: html ? html : "",
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
