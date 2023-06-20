import React, { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen items-center p-4 lg:p-8">{children}</div>
  )
}
