import connectDB from "@/lib/database";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const GET = async (req: Request) => {
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

    return NextResponse.json({ user, success: true }, { status: 200 });
    // got some error
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: (error as any)?.message || "Internal server error" },
      { status: 500 },
    );
  }
};
