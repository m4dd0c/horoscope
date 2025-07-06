import * as jose from "jose";
import { Types } from "mongoose";

const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET);
export const encodeJWT = async (payload: {
  userId: Types.ObjectId | string;
}) => {
  const token = await new jose.SignJWT({ userId: payload.userId.toString() })
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedSecret);
  return token;
};
export const decodeJWT = async (token: string) => {
  const decode = await jose.jwtVerify(token, encodedSecret);
  return decode;
};
