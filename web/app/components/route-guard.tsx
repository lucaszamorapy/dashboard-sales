"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { validToken } from "../_actions/users";

const RouteGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await validToken({ token });

        if (!data) {
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  return null;
};

export default RouteGuard;
