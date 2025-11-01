"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"
import { motion } from "framer-motion"

interface DashboardCardProps {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
  className?: string
}

export default function DashboardCard({
  title,
  description,
  children,
  action,
  className,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {action && <div>{action}</div>}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  )
}

