import React, { PropsWithChildren } from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function AuthButton({
  children,
  isLoading,
}: PropsWithChildren & { isLoading: boolean }) {
  return (
    <Button
      disabled={isLoading}
      className="bg-brand text-primary-foreground shadow hover:bg-brand/90"
    >
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
