"use client";

import StatWidget from "@/components/admin/StatWidget";
import DashboardCard from "@/components/admin/DashboardCard";
import DataTable from "@/components/admin/DataTable";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import { Briefcase, Users, Building2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock data
const recentActivity = [
  {
    id: 1,
    action: "New job posted",
    user: "TechCorp",
    item: "Senior Developer",
    time: "2 minutes ago",
    status: "active",
  },
  {
    id: 2,
    action: "User registered",
    user: "John Doe",
    item: "job-seeker@example.com",
    time: "15 minutes ago",
    status: "pending",
  },
  {
    id: 3,
    action: "Company verified",
    user: "StartupXYZ",
    item: "Verified status",
    time: "1 hour ago",
    status: "completed",
  },
  {
    id: 4,
    action: "Job application",
    user: "Jane Smith",
    item: "Frontend Developer",
    time: "2 hours ago",
    status: "active",
  },
  {
    id: 5,
    action: "User updated profile",
    user: "Mike Johnson",
    item: "Profile completion",
    time: "3 hours ago",
    status: "completed",
  },
];

const jobsData = [
  { name: "Jan", count: 45 },
  { name: "Feb", count: 52 },
  { name: "Mar", count: 48 },
  { name: "Apr", count: 61 },
  { name: "May", count: 55 },
  { name: "Jun", count: 67 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatWidget
          title="Total Jobs"
          value="1,234"
          icon={Briefcase}
          description="Active job listings"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatWidget
          title="Total Users"
          value="8,456"
          icon={Users}
          description="Registered users"
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatWidget
          title="Active Companies"
          value="342"
          icon={Building2}
          description="Verified companies"
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatWidget
          title="Pending Approvals"
          value="23"
          icon={CheckCircle2}
          description="Awaiting review"
          trend={{ value: -2.1, isPositive: false }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <AnalyticsChart
          title="Jobs Posted Over Time"
          description="Monthly job posting trends"
          data={jobsData}
          type="line"
          dataKey="count"
          nameKey="name"
        />
        <DashboardCard
          title="Quick Actions"
          description="Common administrative tasks"
        >
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
            >
              <Users className="mb-2 h-5 w-5" />
              <span className="font-medium">Manage Users</span>
              <span className="text-xs text-muted-foreground mt-1">
                View all users
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
            >
              <Briefcase className="mb-2 h-5 w-5" />
              <span className="font-medium">Manage Jobs</span>
              <span className="text-xs text-muted-foreground mt-1">
                View all jobs
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
            >
              <Building2 className="mb-2 h-5 w-5" />
              <span className="font-medium">Manage Companies</span>
              <span className="text-xs text-muted-foreground mt-1">
                View all companies
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
            >
              <CheckCircle2 className="mb-2 h-5 w-5" />
              <span className="font-medium">Pending Reviews</span>
              <span className="text-xs text-muted-foreground mt-1">
                23 items
              </span>
            </Button>
          </div>
        </DashboardCard>
      </div>

      {/* Recent Activity */}
      <DashboardCard
        title="Recent Activity"
        description="Latest actions and updates"
        action={
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        }
      >
        <DataTable
          data={recentActivity}
          columns={[
            {
              key: "action",
              label: "Action",
              render: (value, row) => (
                <span className="font-medium">{value}</span>
              ),
            },
            {
              key: "user",
              label: "User",
            },
            {
              key: "item",
              label: "Item",
            },
            {
              key: "time",
              label: "Time",
            },
            {
              key: "status",
              label: "Status",
              render: (value) => {
                const variants = {
                  active: "default",
                  pending: "secondary",
                  completed: "outline",
                } as const;
                return (
                  <Badge variant={variants[value as keyof typeof variants]}>
                    {value}
                  </Badge>
                );
              },
            },
          ]}
          searchable={false}
          actions={false}
        />
      </DashboardCard>
    </div>
  );
}
