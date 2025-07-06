import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import connectDB from "@/lib/database";
import User from "@/model/User";
import { sendMail } from "@/lib/utils/sendMail";
import { sendToken } from "@/lib/utils/sendToken";

const SignupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  dob: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      return date < today;
    },
    {
      message: "Date of birth must be in the past.",
    },
  ),
});

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const { email, name, password, dob } = await req.json();

    SignupSchema.parse({ email, name, password, dob });

    const isAvailable = await User.findOne({ email });

    if (isAvailable) {
      return NextResponse.json(
        {
          message:
            "Entered Email is already associated with another account. Please visit login page.",
          success: false,
        },
        { status: 400 },
      );
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationEmail = `<p>Hi ${name},</p><p>Thank you for signing up! Please verify your account by clicking the link below:</p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${verificationToken}">Verify Account</a>`;

    await sendMail({
      to: email,
      subject: "Account Verification",
      html: verificationEmail,
    });

    const user = await User.create({
      name,
      email,
      password,
      dob,
      verificationToken: {
        token: verificationToken,
        expires: new Date(Date.now() + 60 * 60 * 1000), // token valid for 1 hour
      },
    });

    const res = await sendToken(user, "signup");
    return res;
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
