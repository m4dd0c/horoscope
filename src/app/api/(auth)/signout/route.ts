import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = NextResponse.json(
      { message: "Logout successfully.", success: true },
      { status: 200 },
    );
    res.cookies.delete("token");
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: (error as any)?.message || "Internal server error",
        success: true,
      },
      { status: 500 },
    );
  }
};
