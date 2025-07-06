"use client";

import { useEffect, useState } from "react";
import logo from "/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { instance } from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, loading, refreshUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const signOut = async () => {
    await instance.get("/signout");
    await refreshUser();
    router.replace("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md shadow-md bg-zinc-900/60"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image src={logo} height={50} width={50} alt="logo" />
        </Link>

        <nav>
          <div className="flex items-center space-x-6 text-sm">
            {!loading &&
              (user ? (
                <div className="flex items-center justify-center space-x-4">
                  <Link className="hover:underline" href="/dashboard">
                    <Avatar>
                      <AvatarImage src="/placeholder.png" alt="User avatar" />
                      <AvatarFallback>
                        {user?.name?.split(" ")?.[0]?.[0]}
                        {user?.name?.split(" ")?.[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <Button variant={"ghost"} onClick={signOut}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-4">
                  <Link className="hover:underline" href="/signin">
                    Sign In
                  </Link>
                  <Link className="hover:underline" href="/signup">
                    Sign Up
                  </Link>
                </div>
              ))}
            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
