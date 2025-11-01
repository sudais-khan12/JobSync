"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatWidgetProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export default function StatWidget({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={cn("overflow-hidden border-border", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold tracking-tight">{value}</p>
                {trend && (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      trend.isPositive ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {trend.isPositive ? "+" : ""}
                    {trend.value}%
                  </span>
                )}
              </div>
              {description && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <div className="rounded-lg bg-gradient-to-br from-[#B260E6]/10 to-[#ED84A5]/10 p-3">
              <Icon className="h-6 w-6 text-[#B260E6]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

