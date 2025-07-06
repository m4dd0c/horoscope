"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AiClient from "@/components/AiClient";
import { getZodiacSign } from "@/lib/utils/getZodiacSign";
import Loading from "@/components/shared/loading";
import useHoroscope from "@/hooks/useHoroscope";
import { format } from "date-fns";
import withAuth from "@/components/withAuth";
import { useAuth } from "@/hooks/useAuth";
import { instance } from "@/lib/axios.instance";
import { Button } from "@/components/ui/button";

function DashboardPage() {
  const { loading: userLoading, user, refreshUser } = useAuth();
  const {
    loading: horoscopeLoading,
    todaysHoroscope,
    weeklyHoroscope,
  } = useHoroscope();

  useEffect(() => {
    refreshUser();
  }, []);

  const resendVerificationToken = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await instance.get("/resend");
  };

  if (userLoading || horoscopeLoading) return <Loading />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-950 from-zinc-50 to-zinc-150 pt-14 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">
          🪐 Your Horoscope Dashboard
        </h1>

        {/* Profile Section */}
        <Card className="dark:bg-zinc-950/50 border-none">
          <CardHeader>
            <CardTitle>Welcome back, Star Gazer</CardTitle>
          </CardHeader>
          {user && (
            <CardContent className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.png" alt="User avatar" />
                <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{user?.name}</p>
                <p className="text-sm text-foreground/60">
                  Zodiac: {getZodiacSign(user?.dob)}
                </p>
                <p className="text-sm text-foreground/50">
                  DOB: {format(new Date(user?.dob), "MMM dd, yyyy")}
                </p>
                {!user?.isVerified && (
                  <p className="text-sm text-orange-500">
                    Please verify your email. Check your email or
                    <Button
                      variant={"link"}
                      onClick={resendVerificationToken}
                      className="underline text-orange-500 cursor-pointer"
                    >
                      Resend Email
                    </Button>
                  </p>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Horoscope Section */}
        <Card className="dark:bg-zinc-950/50 border-none">
          <CardHeader>
            <CardTitle>Today's Horoscope</CardTitle>
            <CardDescription>{todaysHoroscope?.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/60">
              {todaysHoroscope?.horoscope_data || ""}
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-zinc-950/50 border-none">
          <CardHeader>
            <CardTitle>7 Day Horoscope Forecast</CardTitle>
            <CardDescription>{weeklyHoroscope?.week}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/60 space-y-1">
              {weeklyHoroscope?.horoscope_data || ""}
            </p>
          </CardContent>
        </Card>

        {/* mcp or gemini */}
        {todaysHoroscope && weeklyHoroscope && (
          <AiClient
            todaysHoroscope={todaysHoroscope}
            weeklyHoroscope={weeklyHoroscope}
          />
        )}
      </div>
    </div>
  );
}
export default withAuth(DashboardPage);
