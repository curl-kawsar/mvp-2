"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAnalytics } from "@/lib/mock-data";
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Clock,
  Award,
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  Target,
  Eye,
  Brain
} from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPage() {
  const { recruiter: analytics } = mockAnalytics;
  const [timeRange, setTimeRange] = useState("3months");

  // Mock time series data
  const hiringTrendData = [
    { month: "Oct", applications: 45, interviews: 12, offers: 3, hires: 2 },
    { month: "Nov", applications: 52, interviews: 18, offers: 5, hires: 3 },
    { month: "Dec", applications: 48, interviews: 15, offers: 4, hires: 2 },
    { month: "Jan", applications: 61, interviews: 22, offers: 7, hires: 4 },
    { month: "Feb", applications: 55, interviews: 19, offers: 6, hires: 3 },
    { month: "Mar", applications: 67, interviews: 25, offers: 8, hires: 5 },
  ];

  const conversionData = [
    { stage: "Applied", value: 342, percentage: 100 },
    { stage: "Screened", value: 156, percentage: 45.6 },
    { stage: "Interviewed", value: 67, percentage: 19.6 },
    { stage: "Offered", value: 23, percentage: 6.7 },
    { stage: "Hired", value: 15, percentage: 4.4 },
  ];

  const sourceData = [
    { name: "LinkedIn", value: 45, applications: 154 },
    { name: "Job Boards", value: 25, applications: 86 },
    { name: "Referrals", value: 15, applications: 51 },
    { name: "Company Website", value: 10, applications: 34 },
    { name: "Other", value: 5, applications: 17 },
  ];

  const diversityData = [
    { category: "Gender", male: 52, female: 48 },
    { category: "Age", "20-30": 35, "30-40": 40, "40-50": 20, "50+": 5 },
    { category: "Education", bachelor: 60, master: 35, phd: 5 },
  ];

  const performanceMetrics = [
    { metric: "Time to Hire", value: "23 days", change: "-3 days", trend: "down", good: true },
    { metric: "Cost per Hire", value: "$3,200", change: "+$200", trend: "up", good: false },
    { metric: "Offer Acceptance", value: "87%", change: "+5%", trend: "up", good: true },
    { metric: "Interview Show Rate", value: "92%", change: "+2%", trend: "up", good: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive hiring analytics and bias audit reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.metric}</div>
                    </div>
                    <div className={`flex items-center text-sm ${
                      metric.good ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        metric.trend === 'down' ? 'rotate-180' : ''
                      }`} />
                      {metric.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnel">Hiring Funnel</TabsTrigger>
            <TabsTrigger value="sources">Source Analysis</TabsTrigger>
            <TabsTrigger value="diversity">Diversity & Bias</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Hiring Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Trends</CardTitle>
                  <CardDescription>Monthly recruitment activity overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hiringTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="applications" stroke="#8884d8" name="Applications" />
                      <Line type="monotone" dataKey="interviews" stroke="#82ca9d" name="Interviews" />
                      <Line type="monotone" dataKey="offers" stroke="#ffc658" name="Offers" />
                      <Line type="monotone" dataKey="hires" stroke="#ff7300" name="Hires" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Conversion Rates */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rates</CardTitle>
                  <CardDescription>Stage-by-stage conversion analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conversionData.map((stage, index) => (
                    <div key={stage.stage} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{stage.stage}</span>
                        <span className="text-sm text-muted-foreground">
                          {stage.value} candidates ({stage.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${stage.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI-Powered Insights
                  <Badge variant="secondary">AI</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">
                          Optimization Opportunity
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                          Your interview-to-offer conversion rate is 34% above industry average. 
                          Consider increasing interview volume.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900 dark:text-green-100">
                          Performance Trend
                        </h4>
                        <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                          Your time-to-hire has improved by 23% this quarter. Great work on 
                          process efficiency!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-900 dark:text-amber-100">
                          Action Required
                        </h4>
                        <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                          Candidate drop-off rate in the application stage is 15% higher than 
                          benchmark. Review job descriptions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hiring Funnel Tab */}
          <TabsContent value="funnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Funnel Analysis</CardTitle>
                <CardDescription>Detailed breakdown of candidate flow through stages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analytics.hiringFunnel} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))">
                      <LabelList dataKey="count" position="right" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Stage Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.hiringFunnel.map((stage, index) => {
                    const nextStage = analytics.hiringFunnel[index + 1];
                    const conversionRate = nextStage 
                      ? ((nextStage.count / stage.count) * 100).toFixed(1)
                      : null;
                    
                    return (
                      <div key={stage.stage} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{stage.stage}</div>
                          <div className="text-sm text-muted-foreground">{stage.count} candidates</div>
                        </div>
                        {conversionRate && (
                          <div className="text-right">
                            <div className="text-sm font-medium">{conversionRate}%</div>
                            <div className="text-xs text-muted-foreground">conversion</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bottleneck Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <h4 className="font-medium text-red-900 dark:text-red-100">Primary Bottleneck</h4>
                    <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                      Application to Screen conversion: 45.6% (Industry avg: 60%)
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Secondary Issue</h4>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                      Interview to Offer conversion: 34.3% (Could be optimized)
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100">Strong Performance</h4>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Offer to Hire conversion: 87% (Above industry average)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Source Analysis Tab */}
          <TabsContent value="sources" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Application Sources</CardTitle>
                  <CardDescription>Where your best candidates come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Source Performance</CardTitle>
                  <CardDescription>Quality metrics by source</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sourceData.map((source, index) => (
                    <div key={source.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="font-medium">{source.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {source.applications} applications
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>Quality: 4.2/5</div>
                        <div>Speed: 3.8/5</div>
                        <div>Cost: $150</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Diversity & Bias Tab */}
          <TabsContent value="diversity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Bias Audit Report
                  <Badge variant="secondary">AI</Badge>
                </CardTitle>
                <CardDescription>
                  Automated analysis of hiring patterns for potential bias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Gender Distribution</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Male", value: analytics.biasAudit.gender.male },
                            { name: "Female", value: analytics.biasAudit.gender.female }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          <Cell fill="#8884d8" />
                          <Cell fill="#82ca9d" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Age Distribution</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={Object.entries(analytics.biasAudit.age).map(([age, value]) => ({ age, value }))}>
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Bias Detection Results</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-900 dark:text-green-100">No Bias Detected</span>
                      </div>
                      <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                        Gender representation in hiring pipeline
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-yellow-900 dark:text-yellow-100">Minor Deviation</span>
                      </div>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
                        Age distribution slightly skewed toward younger candidates
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-blue-900 dark:text-blue-100">Within Range</span>
                      </div>
                      <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
                        Education requirements aligned with industry standards
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}