import "@repo/ui/styles.css"
import "./globals.css"
import type { Metadata } from "next"
import { Geist, Figtree, Caveat } from "next/font/google"
import { ReactLenis } from "lenis/react"
const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const geist = Geist({ subsets: ["latin"] })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })

export const metadata: Metadata = {
  title: "Arun Prakash",
  description: "Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`font-sans ${figtree.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className={geist.className}>
        <ReactLenis root options={{ duration: 1, lerp: 0.1 }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  )
}
