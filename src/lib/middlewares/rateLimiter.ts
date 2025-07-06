import { headers } from "next/headers";
import { NextResponse } from "next/server";

const RATE_LIMIT = 15; // Max requests allowed
const WINDOW_MS = 60 * 1000; // 1 minute window
const requests = new Map<string, number[]>(); // Store IP & timestamps

export const rateLimiter = async (req: Request) => {
  try {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown"; // Get IP address

    const now = Date.now();
    const timestamps = requests.get(ip) || []; // Getting timestamps

    // Remove old timestamps that are older than the WINDOW_MS
    const filteredTimestamps = timestamps.filter(
      (time) => now - time < WINDOW_MS,
    );

    // Checking How Many requests we can send
    if (filteredTimestamps.length >= RATE_LIMIT) {
      return NextResponse.json(
        { message: "Too many requests, Please wait for 1 minute." },
        { status: 429 },
      );
    }

    // Adding new timestamp
    filteredTimestamps.push(now);
    requests.set(ip, filteredTimestamps);

    return null;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
