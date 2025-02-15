"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar"
import {NavMain} from "./nav-main";
import {NavSecondary} from "./nav-secondary";
import {NavUser} from "./nav-user";
import {SearchForm} from "./search-form";

const data = {
  user: {
    name: "Marc Got",
    email: "marc.got@imae.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Proyectos",
      url: "/projects",
      icon: SquareTerminal,
      isActive: true,
    },
    /*{
      title: "Orders",
      url: "/orders",
      icon: SquareTerminal,
      isActive: true,
    },*/
    {
      title: "Transportistas",
      url: "/hauliers",
      icon: SquareTerminal,
      isActive: false,
    },
    {
      title: "Clientes",
      url: "/customers",
      icon: SquareTerminal,
      isActive: false,
    },
    {
      title: "Proveedores",
      url: "/providers",
      icon: SquareTerminal,
      isActive: false,
    },
    {
      title: "Facturas",
      url: "/invoices",
      icon: SquareTerminal,
      isActive: false,
    },
  ],
  /*navSecondary: [
    {},
    {
      title: "Settings",
      url: "/appearance",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],*/
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">IMAE</span>
                  {/*<span className="truncate text-xs">Enterprise</span>*/}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavSecondary items={data.navSecondary} className="mt-auto" />*/}
      </SidebarContent>
      {/*<SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>*/
      }
    </Sidebar>
  )
}
