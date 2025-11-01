"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ChartProps {
  title: string
  description?: string
  data: any[]
  type: "line" | "bar" | "pie"
  dataKey: string
  nameKey?: string
  colors?: string[]
  className?: string
}

const COLORS = ["#B260E6", "#ED84A5", "#8B5CF6", "#EC4899", "#A855F7"]

export default function AnalyticsChart({
  title,
  description,
  data,
  type,
  dataKey,
  nameKey = "name",
  colors = COLORS,
  className,
}: ChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            {type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey={nameKey} className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke="#B260E6"
                  strokeWidth={2}
                  dot={{ fill: "#B260E6", r: 4 }}
                />
              </LineChart>
            ) : type === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey={nameKey} className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Bar dataKey={dataKey} fill="#B260E6" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey={dataKey}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

