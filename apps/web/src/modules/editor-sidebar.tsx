"use client"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { HomeIcon, Eye, ArrowLeft } from "@hugeicons/core-free-icons"

export function EditorSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const params = useParams()
  const appId = params.appId
  const currentPath = usePathname()
  const isPageDesign = currentPath?.includes("/page")
  const data = {
    navMain: [
      {
        title: "Application",
        url: `/${appId}`,
        items: [
          {
            title: "Pages",
            url: `/${appId}`,
            icon: HomeIcon,
            isActive: false,
          },
          {
            title: "Preview",
            url: `/${appId}/preview`,
            icon: Eye,
            isActive: true,
          },
          {
            title: "Back",
            url: `/`,
            icon: ArrowLeft,
            isActive: true,
          },
        ],
      },
    ],
  }

  if (isPageDesign) return

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
                    const isActive = item?.url === currentPath
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          isActive={isActive}
                          data-active={isActive}
                          className="data-[active=true]:bg-primary rounded-md"
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
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      {/* <SidebarFooter>
        <UserButton />
      </SidebarFooter> */}
    </Sidebar>
  )
}
