"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { House, NotebookPen, Store, Users } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Início",
      url: "/",
      icon: House,
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: Users,
    },
    {
      title: "Produtos",
      url: "/products",
      icon: Store,
    },
    {
      title: "Pedidos",
      url: "/orders",
      icon: NotebookPen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={"/"}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Dashboard Sales</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
