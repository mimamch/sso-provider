import React from "react"
import {
  Cross1Icon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
  LaptopIcon,
  MoonIcon,
  ReloadIcon,
  SunIcon,
} from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const Icons = {
  sun: SunIcon,
  moon: MoonIcon,
  spinner: ReloadIcon,
  laptop: LaptopIcon,
  close: Cross1Icon,
  gitHub: GitHubLogoIcon,
  hamburgerIcon: HamburgerMenuIcon,
  logo: ({ className, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(
        "w-fit select-none rounded-t-2xl rounded-br-2xl bg-brand px-2 py-1 text-center text-lg font-bold tracking-tight text-white",
        className
      )}
    >
      {siteConfig.name}
    </h2>
  ),
}
