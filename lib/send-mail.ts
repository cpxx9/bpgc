"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { ZodError } from "zod";
import { getNextEvent } from "@/lib/actions/event.actions";
import { convertToFormDate, convertToFormTime, formatError } from "@/lib/utils";
import { eventRegisterSchema } from "@/lib/validators";
import { escapeHtml } from "@/lib/escape-html";
import { allowMailAttempt } from "@/lib/rate-limit-email";
import type { ActionResultMessage } from "@/types";

const OK: ActionResultMessage = { success: true, message: "Email sent!" };

function getTransporter() {
  const { SMTP_SERVER_HOST, NODEMAILER_USER, NODEMAILER_PASS } = process.env;
  if (!SMTP_SERVER_HOST || !NODEMAILER_USER || !NODEMAILER_PASS) {
    throw new Error("Mail is not configured");
  }
  return nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: 465,
    secure: true,
    auth: { user: NODEMAILER_USER, pass: NODEMAILER_PASS },
  });
}

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:6px 12px;font-weight:bold;color:#444;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:6px 12px;color:#111">${value}</td>
  </tr>`;

export async function sendMail(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResultMessage> {
  if (formData.get("hp_field")) return OK;

  try {
    const data = eventRegisterSchema.parse({
      player1: formData.get("player1") ?? "",
      player2: formData.get("player2") ?? "",
      player3: formData.get("player3") ?? "",
      player4: formData.get("player4") ?? "",
      comment: formData.get("comment") ?? "",
    });

    const h = await headers();
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("x-real-ip") ??
      "unknown";
    if (!(await allowMailAttempt(ip))) {
      return {
        success: false,
        message: "Too many registrations right now. Please try again later.",
      };
    }

    const { data: event } = await getNextEvent();
    if (!event) {
      return { success: false, message: "There's no upcoming event to register for." };
    }
    const to = process.env.SITE_MAIL_RECEIVER;
    if (!to) throw new Error("SITE_MAIL_RECEIVER is not set");

    const date = convertToFormDate(event.date);
    const tee = convertToFormTime(event.time);

    const text = [
  "Player Registration",
  `Event: ${event.description}`,
  `Date: ${date}`,
  `Course: ${event.location}`,
  `1st Tee time: ${tee}`,
  "",
  `Player 1: ${data.player1}`,
  ...(data.player2 ? [`Player 2: ${data.player2}`] : []),
  ...(data.player3 ? [`Player 3: ${data.player3}`] : []),
  ...(data.player4 ? [`Player 4: ${data.player4}`] : []),
  ...(data.comment ? ["", `Comment: ${data.comment}`] : []),
].join("\n");

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;font-size:16px;line-height:1.4">
  <h2 style="margin:0 0 4px">Event Registration</h2>
  <p style="margin:0 0 16px;color:#555">${escapeHtml(event.description)}</p>
  <table style="border-collapse:collapse;width:100%;margin-bottom:16px;background:#f6f8fa">
    ${row("Date", escapeHtml(date))}
    ${row("Course", escapeHtml(event.location))}
    ${row("1st tee time", escapeHtml(tee))}
  </table>
  <h3 style="margin:0 0 4px">Players</h3>
  <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
    ${row("Player 1", escapeHtml(data.player1))}
    ${data.player2 ? row("Player 2", escapeHtml(data.player2)) : ""}
    ${data.player3 ? row("Player 3", escapeHtml(data.player3)) : ""}
    ${data.player4 ? row("Player 4", escapeHtml(data.player4)) : ""}
  </table>
  ${
    data.comment
      ? `<h3 style="margin:0 0 4px">Comment</h3>
         <p style="margin:0">${escapeHtml(data.comment).replace(/\n/g, "<br>")}</p>`
      : ""
  }
</div>`;

    await getTransporter().sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject: "Beaver Point Event Registration Form",
      text,
      html,
    });

    return OK;
  } catch (err) {
    if (err instanceof ZodError) {
      return { success: false, message: formatError(err) };
    }
    console.error("sendMail failed:", err);
    return {
      success: false,
      message: "Couldn't send your registration. Please try again later.",
    };
  }
}