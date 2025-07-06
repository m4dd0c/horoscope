import { ICookieOptions, IUser } from "@/types/api";
import { NextResponse } from "next/server";
import { encodeJWT } from "./jwt";

/**
 * Create JWT Token and sets it to cookies, key:"token"
 *
 * @param {IUser} user An instance of User model
 * @param type The type determines the message for NextResponse.
 */
export const sendToken = async (user: IUser, type?: "signup") => {
  // generating token
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      {
        message: "Something went wrong, Please try again later.",
        success: false,
      },
      { status: 400 },
    );
  }
  const payload = { userId: user._id };

  const token = await encodeJWT(payload);
  if (!token) {
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 400 },
    );
  }

  const cookieOptions: ICookieOptions = {
    // TODO: un-comment in prod
    // httpOnly: true,
    // sameSite: "none",
    // secure: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };

  const message =
    type === "signup"
      ? "We sent verification Email to you. Please verify your account ASAP"
      : "You have been signed-in successfully.";
  // sending response
  const res = NextResponse.json(
    { message, success: true },
    { status: type === "signup" ? 201 : 200 },
  );

  // setting cookies
  res.cookies.set("token", token, cookieOptions);

  return res;
};
