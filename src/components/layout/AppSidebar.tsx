import {
  CircleHelp,
  Clock,
  History,
  Home,
  Inbox,
  LibraryBig,
  SettingsIcon,
  ThumbsUp,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button" // Make sure this import exists

import { SideBarGroup } from "@/types/layout"
import Logo from "../ui/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"



const commonGroups: SideBarGroup[] = [
  {
    label: "Home",
    items: [
      {
        title: "Home",
        url: "/home",
        icon: Home,
      },
      {
        title: "Subscriptions",
        url: "/subscriptions",
        icon: Inbox,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        title: "Settings",
        url: "/account",
        icon: SettingsIcon,
      },
      {
        title: "Help",
        url: "/help",
        icon: CircleHelp,
      },
    ],
  },
]

// "You" group - only shown if logged in
const youGroup: SideBarGroup = {
  label: "You",
  items: [
    {
      title: "History",
      url: "/feed/history",
      icon: History,
    },
    {
      title: "Liked Videos",
      url: "/playlist?list=LL",
      icon: ThumbsUp,
    },
    {
      title: "Watch later",
      url: "/playlist?list=WL",
      icon: Clock,
    },
    {
      title: "Playlists",
      url: "/feed/playlists",
      icon: LibraryBig,
    },
  ],
}

export function AppSidebar() {
  const pathName = usePathname()
  const { isAuthenticated } = useAuth()

  const homeGroup = commonGroups.find((g) => g.label === "Home")!
  const accountGroup = commonGroups.find((g) => g.label === "Account")!

  return (
    <Sidebar>
      <SidebarContent className="mt-12">

        {/* --- HOME GROUP --- */}
        <SidebarGroup>
          <SidebarGroupLabel>{homeGroup.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {homeGroup.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- YOU GROUP (conditional) --- */}
        <SidebarGroup>
          <SidebarGroupLabel>{youGroup.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            {isAuthenticated ? (
              <SidebarMenu>
                {youGroup.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <div className="p-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/login?next=${pathName}`}>Sign In</Link>
                </Button>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- ACCOUNT GROUP --- */}
        <SidebarGroup>
          <SidebarGroupLabel>{accountGroup.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountGroup.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
