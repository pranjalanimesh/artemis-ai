import type { Metadata } from "next"
import { Sansation, Outfit } from "next/font/google"
import "./globals.css"
import WorkspaceFrame from "@/components/layout/WorkspaceFrame"

const heading = Sansation({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ArtemisAI",
  description: "AI assisted Medical Review",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        <WorkspaceFrame>{children}</WorkspaceFrame>
      </body>
    </html>
  )
}
