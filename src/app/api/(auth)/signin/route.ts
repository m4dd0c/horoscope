import connectDB from "@/lib/database";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sendToken } from "@/lib/utils/sendToken";
import User from "@/model/User";
import { NextResponse } from "next/server";

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const POST = async (req: Request) => {
  try {
    await connectDB();
    const { email, password } = await req.json();

    SigninSchema.parse({ email, password });

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return NextResponse.json(
        {
          message: "You have entered incorrect credentials. Please try again.",
          success: false,
        },
        { status: 401 },
      );

    // compare password
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      return NextResponse.json(
        {
          message: "You have entered incorrect credentials. Please try again.",
          success: false,
        },
        { status: 401 },
      );

    // sending jwt
    const res = await sendToken(user);
    return res;
    // got some error
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
