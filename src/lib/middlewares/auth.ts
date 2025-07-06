import { NextResponse, NextRequest } from "next/server";
import { decodeJWT } from "../utils/jwt";

// NOTE: due to edgy runtime of nextjs, we can't use mongoose and jwt in middleware since they need nodejs runtime.
export async function auth(req: NextRequest) {
  try {
    // getting token
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json(
        { message: "You are not loggedin, Please login again." },
        { status: 401 },
      );

    // accessing jwt token
    const secret = process.env.JWT_SECRET;
    if (!secret)
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );

    // verification process
    const decode = await decodeJWT(token);
    if (!decode)
      return NextResponse.json(
        { message: "You are not loggedin, Please login again." },
        { status: 401 },
      );

    const res = NextResponse.next();

    // can't do req.userId because NextRequest doesn't persists between routes and middlewares
    res.headers.set("x-userId", decode.payload?.userId as string);
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: (error as any)?.message || "Internal server error." },
      { status: 500 },
    );
  }
}
