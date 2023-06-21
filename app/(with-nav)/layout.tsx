import { SiteHeader } from "@/components/site-header"
import StateInitializer from "@/components/state-initializer"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col md:container">
      <StateInitializer />
      <SiteHeader />
      <div className="flex-1">{children}</div>
    </div>
  )
}
