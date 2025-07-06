import { NextResponse, NextRequest } from "next/server";
declare module "next/server" {
  interface NextRequest {
    payload?: Record<string, any>;
    userId?: string;
  }
}

export interface iUser {
  name: string;
  dob: string;
  isVerified: boolean;
}
export interface iDailyHoroscope {
  horoscope_data: string;
  date: string;
}

export interface iWeeklyHoroscope {
  week: string;
  horoscope_data: string;
}

export interface iAuthContext {
  user: iUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  setUser: (user: iUser | null) => void;
}
