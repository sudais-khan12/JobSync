"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith("/auth")

  if (isAuthPage) {
    return null
  }

  return <Navbar />
}

