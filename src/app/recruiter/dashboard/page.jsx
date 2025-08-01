"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAnalytics } from "@/lib/mock-data";
import { Users, Briefcase, Calendar, TrendingUp, Clock, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const mockChartData = [
  { month: "Jan", applications: 45, hires: 3 },
  { month: "Feb", applications: 52, hires: 4 },
  { month: "Mar", applications: 48, hires: 2 },
  { month: "Apr", applications: 61, hires: 5 },
  { month: "May", applications: 55, hires: 3 },
  { month: "Jun", applications: 67, hires: 6 },
];

export default function RecruiterDashboard() {
  const { recruiter: analytics } = mockAnalytics;

  const kpiCards = [
    {
      title: "Total Jobs",
      value: analytics.totalJobs,
      icon: Briefcase,
      description: "Active job postings",
      trend: "+12%",
    },
    {
      title: "Total Applicants",
      value: analytics.totalApplicants,
      icon: Users,
      description: "This month",
      trend: "+8%",
    },
    {
      title: "Avg ATS Score",
      value: `${analytics.avgAtsScore}%`,
      icon: Award,
      description: "Quality score",
      trend: "+5%",
    },
    {
      title: "Interviews Scheduled",
      value: analytics.interviewsScheduled,
      icon: Calendar,
      description: "This week",
      trend: "+15%",
    },
    {
      title: "Time to Hire",
      value: `${analytics.timeToHire} days`,
      icon: Clock,
      description: "Average",
      trend: "-3 days",
    },
    {
      title: "Hires Completed",
      value: analytics.hiresCompleted,
      icon: TrendingUp,
      description: "This month",
      trend: "+2",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your recruitment activities and performance metrics
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {kpiCards.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{kpi.trend}</span> {kpi.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Applications Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Applications & Hires Trend</CardTitle>
              <CardDescription>Monthly overview of recruitment activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Applications"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hires" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="Hires"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hiring Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Funnel</CardTitle>
              <CardDescription>Candidate progression through stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.hiringFunnel} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              AI Generated Suggestions
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">AI</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm">📈 Your "Senior Full Stack Developer" job posting has 40% higher engagement than similar roles. Consider duplicating this format for future postings.</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <p className="text-sm">🎯 3 high-scoring candidates from your talent pool match your new Product Manager role. Review matches in the Candidates section.</p>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                <p className="text-sm">⏰ Your average response time to candidates is 4.2 days. Industry benchmark is 2.1 days. Consider setting up automated responses.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}