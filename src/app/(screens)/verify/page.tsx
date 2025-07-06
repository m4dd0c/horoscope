"use client";
import { instance } from "@/lib/axios.instance";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const verifyAccount = async () => {
    if (!token) return;
    await instance.get(`/verify?token=${token}`);
    router.replace("/dashboard");
  };
  verifyAccount();
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Page;
