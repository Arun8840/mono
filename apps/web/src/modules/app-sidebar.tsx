"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { HomeIcon, Drag04Icon } from "@hugeicons/core-free-icons";
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [
        {
          title: "Apps",
          url: "/dashboard",
          icon: HomeIcon,
          isActive: false,
        },
        {
          title: "Drag Items",
          url: "/dashboard/drag-items",
          icon: Drag04Icon,
          isActive: true,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarContent>
        {data.navMain.map((item) => {
          return (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => {
                    const isActive = item?.url === currentPath;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          isActive={isActive}
                          className="data-[active=true]:bg-primary/5"
                          render={
                            <Link
                              href={item.url}
                              className="flex items-center gap-2"
                            />
                          }
                        >
                          <HugeiconsIcon icon={item.icon} />
                          {item.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      {/* <SidebarFooter>
        <UserButton />
      </SidebarFooter> */}
    </Sidebar>
  );
}
