import { horoscopeApiUrl } from "@/lib/constants";
import axios from "axios";
import connectDB from "@/lib/database";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { getZodiacSign } from "@/lib/utils/getZodiacSign";

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const userId = req.headers.get("x-userId");

    const user = await User.findById(userId);

    if (!user)
      return NextResponse.json(
        { message: "Unauthorized access, Please login again.", success: false },
        { status: 401 },
      );
    const sign = getZodiacSign(user.dob.toISOString());

    // Simulate fetching horoscope data
    const horoscopeData = await axios.get(
      `${horoscopeApiUrl}/weekly?sign=${sign}`,
    );
    return NextResponse.json(
      { data: horoscopeData.data, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
};
