import connectDB from "@/lib/database";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { message: "Token is required", success: false },
        { status: 400 },
      );
    }
    // Connect to the database
    await connectDB();
    // Find user by verification token
    const user = await User.findOne({
      "verificationToken.token": token,
      "verificationToken.expires": { $gt: new Date() }, // Check if token is still valid
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token", success: false },
        { status: 400 },
      );
    }
    // Mark user as verified
    user.isVerified = true;
    user.verificationToken.token = undefined;
    user.verificationToken.expires = undefined;
    await user.save();
    return NextResponse.json(
      {
        message: "Account verified successfully",
        success: true,
      },
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
