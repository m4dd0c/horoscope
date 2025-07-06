import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
export const sendMail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_MAIL = process.env.SMTP_MAIL;

  if (!SMTP_MAIL || !SMTP_PASS)
    return NextResponse.json(
      { message: "smtp couldn't be configured." },
      { status: 422 },
    );

  const transporter = createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port: Number(SMTP_PORT) || 587,
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASS,
    },
  });

  const mail = await transporter.sendMail({
    from: SMTP_MAIL,
    to,
    subject,
    html,
  });
  return !!mail;
};
