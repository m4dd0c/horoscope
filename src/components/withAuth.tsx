"use client";
import Loading from "@/components/shared/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { instance } from "@/lib/axios.instance";

const withAuth = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const { data } = await instance.get("/user");

          if (!data?.user) {
            router.replace("/signin");
          }
        } catch (_err) {
          router.replace("/signin");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, [router]);

    if (loading) return <Loading />;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
