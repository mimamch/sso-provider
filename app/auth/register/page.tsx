import React from "react"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AUTH_TOKEN_KEY } from "@/defaults/enum"

import { siteConfig } from "@/config/site"

import { UserAuthRegisterForm } from "./components/auth-register-form"

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { redirect?: string }
}) {
  const query = new URLSearchParams(searchParams)
  const token = cookies().get(AUTH_TOKEN_KEY)?.value
  if (token) redirect("/auth?" + query.toString())
  return (
    <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex justify-center">
        <h2 className=" mb-4 w-fit select-none rounded-br-2xl rounded-tl-2xl rounded-tr-2xl bg-primary-blue px-5 py-2 text-center text-3xl font-bold tracking-tight text-white">
          {siteConfig.name}
        </h2>
      </div>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Please complete the form below to create a new account.
        </p>
      </div>
      <UserAuthRegisterForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
