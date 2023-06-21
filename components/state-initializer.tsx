"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { destroyAuth, getProfile } from "@/server_actions/auth_actions"
import { useAuthStore } from "@/states/auth_state"

export default function StateInitializer() {
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    const get = async () => {
      const profile = await getProfile()
      if (!profile) {
        destroyAuth()
        router.push("/auth")
        return
      }
      useAuthStore.setState({ user: profile })
    }
    get()
    console.log("state init")
  }, [pathname, router])

  return null
}
