import { getSession } from "@auth0/nextjs-auth0"
import "./globals.css"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Inter } from "next/font/google"

const inter = Inter({ weight: ["400", "500", "700"], subsets: ["latin"] })

export const metadata = {
  title: "Later it",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen overflow-scroll bg-black`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
