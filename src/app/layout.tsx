import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import WorkspaceFrame from "@/components/layout/WorkspaceFrame"

const body = Montserrat({
  variable: "--font-body",
  weight: ["400"],
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
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
        </style>
      </head>
      <body className={`${body.variable} antialiased`}>
        <WorkspaceFrame>{children}</WorkspaceFrame>
      </body>
    </html>
  )
}