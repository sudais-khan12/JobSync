"use client"

import DataTable from "@/components/admin/DataTable"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data
const companies = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    status: "verified",
    totalJobs: 45,
    location: "Sydney, NSW",
  },
  {
    id: 2,
    name: "StartupXYZ",
    industry: "Software",
    status: "verified",
    totalJobs: 32,
    location: "Melbourne, VIC",
  },
  {
    id: 3,
    name: "DesignStudio",
    industry: "Design",
    status: "verified",
    totalJobs: 18,
    location: "Brisbane, QLD",
  },
  {
    id: 4,
    name: "CloudTech",
    industry: "Cloud Services",
    status: "pending",
    totalJobs: 0,
    location: "Perth, WA",
  },
  {
    id: 5,
    name: "InnovateCo",
    industry: "Innovation",
    status: "verified",
    totalJobs: 67,
    location: "Adelaide, SA",
  },
  {
    id: 6,
    name: "DataLab",
    industry: "Data Science",
    status: "verified",
    totalJobs: 29,
    location: "Canberra, ACT",
  },
  {
    id: 7,
    name: "GreenEnergy",
    industry: "Energy",
    status: "verified",
    totalJobs: 14,
    location: "Darwin, NT",
  },
  {
    id: 8,
    name: "HealthTech",
    industry: "Healthcare",
    status: "pending",
    totalJobs: 0,
    location: "Hobart, TAS",
  },
]

export default function CompaniesPage() {
  const handleViewProfile = (company: unknown) => {
    console.log("View profile:", company)
    // Navigate to company detail page
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <p className="text-muted-foreground mt-1">
          Manage all registered companies and their verification status.
        </p>
      </div>

      {/* Companies Table */}
      <DataTable
        data={companies}
        columns={[
          {
            key: "name",
            label: "Company Name",
            render: (value) => (
              <span className="font-medium text-foreground">{value}</span>
            ),
          },
          {
            key: "industry",
            label: "Industry",
            render: (value) => <Badge variant="outline">{value}</Badge>,
          },
          {
            key: "location",
            label: "Location",
          },
          {
            key: "totalJobs",
            label: "Total Jobs",
            render: (value) => (
              <span className="font-medium">{value} posted</span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (value) => {
              const variants = {
                verified: "default",
                pending: "secondary",
                inactive: "outline",
              } as const
              return (
                <Badge variant={variants[value as keyof typeof variants]}>
                  {value}
                </Badge>
              )
            },
          },
        ]}
        searchable={true}
        searchPlaceholder="Search companies..."
        onEdit={handleViewProfile}
        editLabel="View Profile"
        actions={true}
      />
    </div>
  )
}

