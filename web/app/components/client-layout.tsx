// app/components/client-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarInset } from "./ui/sidebar";
import { SiteHeader } from "./site-header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) return <>{children}</>;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader path={pathname} />
        <div className="w-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
