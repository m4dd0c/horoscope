import { iDailyHoroscope, iWeeklyHoroscope } from "@/types/next";
import { instance } from "@/lib/axios.instance";
import { useEffect, useState } from "react";

const useHoroscope = () => {
  const [todaysHoroscope, setTodaysHoroscope] =
    useState<iDailyHoroscope | null>(null);
  const [weeklyHoroscope, setWeeklyHoroscope] =
    useState<iWeeklyHoroscope | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: todaysHoroscopeData } =
          await instance.get("/horoscope/today");
        const { data: weeklyHoroscopeData } =
          await instance.get("/horoscope/history");

        if (todaysHoroscopeData && todaysHoroscopeData?.data?.data) {
          setTodaysHoroscope(todaysHoroscopeData.data.data);
        }
        if (weeklyHoroscopeData && weeklyHoroscopeData?.data?.data) {
          setWeeklyHoroscope(weeklyHoroscopeData.data.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, todaysHoroscope, weeklyHoroscope };
};

export default useHoroscope;
