"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { motion } from "framer-motion";

const MOBILE_BREAKPOINT = 768; // md breakpoint in Tailwind

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

      if (isMobile) {
        // Close sidebar on mobile screens
        setIsSidebarOpen(false);
      } else {
        // Open sidebar on desktop screens if it was previously open
        // You can set it to true if you want it open by default on desktop
        const wasOpen = sessionStorage.getItem("sidebarOpen") === "true";
        setIsSidebarOpen(wasOpen);
      }
    };

    // Check initial screen size
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (!isMobile) {
      // On desktop, check if sidebar was open before
      const wasOpen = sessionStorage.getItem("sidebarOpen") === "true";
      setIsSidebarOpen(wasOpen || true); // Default to open on desktop
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save sidebar state to sessionStorage when it changes (only on desktop)
  useEffect(() => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      sessionStorage.setItem("sidebarOpen", isSidebarOpen.toString());
    }
  }, [isSidebarOpen]);

  const handleToggle = () => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

    // Prevent opening on mobile
    if (isMobile && !isSidebarOpen) {
      return;
    }

    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <motion.div
        initial={false}
        animate={{
          marginLeft: isSidebarOpen ? 256 : 96, // Match sidebar width (256px when open, 96px when closed)
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-1 flex-col overflow-hidden min-w-0"
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-6 md:px-8 py-6">
            <motion.div
              key={isSidebarOpen ? "open" : "closed"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-7xl space-y-6"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}
