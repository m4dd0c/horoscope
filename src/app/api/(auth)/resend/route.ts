import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/database";
import User from "@/model/User";
import { sendMail } from "@/lib/utils/sendMail";
import { headers } from "next/headers";

export const GET = async () => {
  try {
    await connectDB();

    const headersList = await headers();
    const userId = headersList.get("x-userId");

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json(
        { message: "Unauthorized access, Please login again." },
        { status: 401 },
      );

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationEmail = `<p>Hi ${user.name},</p><p>Thank you for signing up! Please verify your account by clicking the link below:</p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${verificationToken}">Verify Account</a>`;

    await sendMail({
      to: user.email,
      subject: "Account Verification",
      html: verificationEmail,
    });

    await user.updateOne({
      verificationToken: {
        token: verificationToken,
        expires: new Date(Date.now() + 60 * 60 * 1000), // token valid for 1 hour
      },
    });

    return NextResponse.json(
      { message: "Verification email sent successfully!", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: (error as any)?.message || "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
};
