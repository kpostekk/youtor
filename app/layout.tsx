import { Inter, Itim } from "next/font/google"
import "./globals.css"
import classNames from "classnames"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const itim = Itim({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-itim",
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={classNames(itim.variable, inter.variable)}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
