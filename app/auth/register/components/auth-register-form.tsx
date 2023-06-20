"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { registerAction } from "@/server_actions/auth_actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { parseError } from "@/lib/error"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form"
import { Icons } from "@/components/icons"

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirm_password: z.string(),
    full_name: z.string().min(5).max(30),
    phone: z.string().optional(),
  })
  .refine((values) => values.password == values.confirm_password, {
    message: "Password does'nt match",
    path: ["confirm_password"],
  })

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthRegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      setIsLoading(true)
      const res = await registerAction(values)
      toast.success(
        `Hi ${res.profile?.full_name || res.email}, Thank you for join us`
      )
      loadingToast("Redirecting on 3 seconds...")
      await new Promise((r) => setTimeout(r, 3000))
      router.push("/auth")
    } catch (error) {
      toast.error(parseError(error).message)
    }
    setIsLoading(false)
  }

  const loadingToast = (message?: string | null, duration?: number | null) => {
    toast.loading(message ?? "Loading...", { duration: duration ?? 3000 })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="full_name">Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        id="full_name"
                        placeholder="Enter your name"
                        type="text"
                        autoCapitalize="words"
                        autoComplete="name"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email *</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Enter your active email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="mx-2">
                      Activation link will sent to this email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone">Phone or WhatsApp</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        placeholder="Enter your phone / WA number"
                        type="number"
                        autoCapitalize="none"
                        autoComplete="phone"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid ">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password *</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Your password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="mx-2">
                      Make sure the password is strong
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid ">
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirm_password">
                      Confirm Password *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="confirm_password"
                        placeholder="Confirm Your password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="bg-primary-blue text-white hover:bg-primary-blue/80 "
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Account
            </Button>
          </div>
        </form>
      </Form>

      <span className="text-center text-sm font-medium text-muted-foreground ">
        Already have an account?{" "}
        <Link
          href={"/auth/login"}
          className="text-accent-foreground underline underline-offset-4"
        >
          Login
        </Link>
      </span>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  )
}
