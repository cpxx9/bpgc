"use server";
import { getNextEvent } from "@/lib/actions/event.actions";
import { convertToFormDate, convertToFormTime, formatError } from "@/lib/utils";
import { eventRegisterSchema } from "@/lib/validators";
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

    const { data: event } = await getNextEvent();

    const eventText = event
      ? `Event: ${event.description}\nDate: ${convertToFormDate(event.date)}\nCourse: ${event.location}\n1st Tee time: ${convertToFormTime(event.time)}`
      : "Event: No event currently scheduled";

    const eventHtml = event
      ? `<h2>${event.description}</h2>
<h4>Date: ${convertToFormDate(event.date)}</h4>
<h4>Course: ${event.location}</h4>
<h4>1st Tee Time: ${convertToFormTime(event.time)}</h4>`
      : `<h3>No event currently scheduled</h3>`;

    const data = eventRegisterSchema.parse({
      player1: formData.get("player1") || "",
      player2: formData.get("player2") || "",
      player3: formData.get("player3") || "",
      player4: formData.get("player4") || "",
      comment: formData.get("comment") || "",
    });

    await transporter.sendMail({
      ...mailOptions,
      subject: "Beaver Point Event Registration Form",
      text: `Player Registration\n${eventText}\n\nPlayer Info\nPlayer 1: ${data.player1}\nPlayer 2: ${data.player2}\nPlayer 3: ${data.player3}\nPlayer 4: ${data.player4}n\nComment: ${data.comment}`,
      html: `<h1>Event Registration</h1>
             ${eventHtml}
             <h2>Player info</h2>
             <h4>Player 1: ${data.player1}</h4>
             <h4>Player 2: ${data.player2}</h4>
             <h4>Player 3: ${data.player3}</h4>
             <h4>Player 4: ${data.player4}</h4>
             <h4>Comment: ${data.comment}</h4>`,
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
