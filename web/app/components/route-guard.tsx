"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { validToken } from "../_actions/users";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  const checkToken = useCallback(async () => {
    if (pathname === "/login") {
      setAuthorized(true);
      return;
    }
    const token = localStorage.getItem("token");
    const data = await validToken({ token });

    if (!token || !data) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (!authorized) return null;

  return <>{children}</>;
}
