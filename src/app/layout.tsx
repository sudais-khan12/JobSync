import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobSync - Verified Workforce Platform | Trusted Credentials & AI Career Tools",
  description: "JobSync unifies verified candidates, employers, and institutions in one secure ecosystem for digital credentials, job matching, and workforce compliance.",
  keywords: `
  "verified workforce",
  "credential verification software",
  "portable qualifications",
  "compliance platform",
  "AI job assistant",
  "white-label HR software",
  "verified job seekers Australia",`

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalNavbar/>
        {children}
        <ConditionalFooter/>
      </body>
    </html>
  );
}
