"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { destroyAuth } from "@/server_actions/auth_actions"
import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react"
import { toast } from "react-hot-toast"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function UserAvatar() {
  const router = useRouter()
  const logout = () => {
    toast.loading("Logging out...", { duration: 1000 })
    destroyAuth()
    router.push("/auth")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          <Avatar className="h-7 w-7">
            {/* <AvatarImage src="/avatars/02.png" /> */}
            <AvatarFallback>IM</AvatarFallback>
          </Avatar>
          <span className="sr-only">Profile Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <User2Icon className="mr-2 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 w-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOutIcon className="mr-2 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
