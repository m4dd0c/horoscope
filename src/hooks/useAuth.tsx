"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "@/lib/axios.instance";
import { iAuthContext, iUser } from "@/types/next";

const AuthContext = createContext<iAuthContext>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get("/user");
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
