"use client";
import { instance } from "@/lib/axios.instance";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) return;
      await instance.get(`/verify?token=${token}`);
      router.replace("/");
    };
    verifyAccount();
  }, [router]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="my-2">
          <Loader2 className="animate-spin" />
        </div>
        <p>Please be patient, while we are verifying your account.</p>
      </div>
    </div>
  );
};

export default Page;
