import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LogOut,
  Settings,
  HelpCircle,
  UserCircle,
  Monitor,
  Globe,
  DollarSign,
  Youtube,
  Users,
  ChevronRight,
  YoutubeIcon,
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { User } from "@/types"
import Link from "next/link"

const AccountDropDownMenu = ({ user }: { user: User }) => {
  const { logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <img
          src={user?.avatar}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-0 rounded-xl shadow-xl border border-gray-200">
        {/* Header */}
        <div className="p-4 flex items-center gap-4">
          <img
            src={user?.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user?.username || "Your Name"}</span>
            <span className="text-xs text-muted-foreground">
              {user?.email || "you@email.com"}
            </span>
            <Link href={`/channel`} className="mt-1 text-xs text-blue-600 font-medium hover:underline">
              Manage your Channel
            </Link>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Main Actions */}
        <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
         <Link href={`/channel`} className="flex gap-2">
          <UserCircle size={18} />
          Your channel</Link>
        </DropdownMenuItem>

            <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
         <Link href={`/studio`} className="flex gap-2">
          <YoutubeIcon size={18} />
         Studio</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => logout()}
          className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer"
        >
          <LogOut size={18} />
          Sign out
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Purchases & Data */}
        <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
          <DollarSign size={18} />
          Purchases and memberships
        </DropdownMenuItem>
      

        <DropdownMenuSeparator />

        {/* Appearance / Language / Location */}
        <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
          <Monitor size={18} />
          Appearance: Device theme
          <ChevronRight size={14} className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
          <Globe size={18} />
          Language: English
          <ChevronRight size={14} className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
          <Globe size={18} />
          Location: India
          <ChevronRight size={14} className="ml-auto" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Settings & Help */}
        <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
          <Link href={`/account`} className="flex items-center gap-2"> <Settings size={18} />
          Settings</Link>
         
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
        <Link href={`/help`} className="flex items-center gap-2">
          <HelpCircle size={18} />
          Help</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 gap-2 hover:bg-muted cursor-pointer">
          <HelpCircle size={18} />
          Send feedback
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropDownMenu
