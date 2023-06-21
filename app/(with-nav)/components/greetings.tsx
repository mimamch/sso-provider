"use client"

import React from "react"
import Link from "next/link"
import { useAuthStore } from "@/states/auth_state"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function Greetings() {
  const user = useAuthStore((state) => state.user)
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <div className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          <span className="flex">
            Hi,{" "}
            <div className="inline-flex w-[200px] items-center md:w-auto">
              {!user && <Skeleton className="h-6 w-40 rounded-md md:w-60" />}
              {user && (
                <span className="truncate text-primary-blue">
                  {user.full_name}.
                </span>
              )}
            </div>
          </span>
          <span> Let&apos;s Start Manage Your Account</span>
        </div>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
    </section>
  )
}
