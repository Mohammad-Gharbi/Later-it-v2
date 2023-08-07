import { getSession } from "@auth0/nextjs-auth0"
import "./globals.css"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/theme-provider"

const inter = Inter({ weight: ["400", "500", "700"], subsets: ["latin"] })

export const metadata = {
  title: "Later it",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-screen bg-black font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
