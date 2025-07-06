import { NextRequest } from "next/server";
import { auth } from "./lib/middlewares/auth";
import { NextResponse } from "next/server";
import { rateLimiter } from "./lib/middlewares/rateLimiter";

const authPaths = ["/api/user", "/api/horoscope"];
const rateLimitPaths = ["/api/signin", "/api/signup", "/api/horoscope"];

const doesInclude = (url: URL, paths?: string[]): boolean => {
  paths = paths || authPaths;
  return paths.some((elem) => url.pathname.startsWith(elem));
};

export async function middleware(req: NextRequest) {
  try {
    const url = new URL(req.url);

    if (doesInclude(url, rateLimitPaths)) {
      const res = await rateLimiter(req);
      if (res) return res;
    }
    // Conditions for different middleware
    if (doesInclude(url)) {
      const res = await auth(req);
      return res || NextResponse.next();
    }
    // add other here ...
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export const config = {
  matcher: ["/api/:path*"], // Apply to specific routes
};
