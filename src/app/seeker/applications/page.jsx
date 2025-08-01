"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockApplications } from "@/lib/mock-data";
import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { 
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Building,
  ExternalLink,
  MessageSquare,
  FileText,
  TrendingUp,
  CheckCircle2,
  Circle,
  AlertCircle,
  Gift
} from "lucide-react";
import { motion } from "framer-motion";

const statusConfig = {
  applied: {
    title: "Applied",
    description: "Applications submitted",
    color: "bg-blue-500",
    icon: Circle,
  },
  interview: {
    title: "Interview",
    description: "Interview scheduled/completed",
    color: "bg-yellow-500",
    icon: Calendar,
  },
  offer: {
    title: "Offer",
    description: "Offer received",
    color: "bg-green-500",
    icon: Gift,
  },
  hired: {
    title: "Hired",
    description: "Successfully hired",
    color: "bg-emerald-500",
    icon: CheckCircle2,
  },
  rejected: {
    title: "Rejected",
    description: "Application rejected",
    color: "bg-red-500",
    icon: AlertCircle,
  },
};

function SortableApplicationCard({ application }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: application.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="mb-3 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium line-clamp-1">{application.job.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="w-3 h-3" />
                  <span>{application.job.company}</span>
                </div>
              </div>
              <img
                src={application.job.companyLogo}
                alt={application.job.company}
                className="w-8 h-8 rounded"
              />
            </div>

            {/* Details */}
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{application.job.location}</span>
              </div>
              {application.job.salary && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-3 h-3" />
                  <span>{application.job.salary}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Special info for different statuses */}
            {application.status === "interview" && application.interviewDate && (
              <div className="p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded text-xs">
                <div className="flex items-center gap-1 font-medium text-yellow-800 dark:text-yellow-200">
                  <Calendar className="w-3 h-3" />
                  Interview: {new Date(application.interviewDate).toLocaleDateString()}
                </div>
              </div>
            )}

            {application.status === "offer" && application.offerAmount && (
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded text-xs">
                <div className="flex items-center gap-1 font-medium text-green-800 dark:text-green-200">
                  <Gift className="w-3 h-3" />
                  Offer: {application.offerAmount}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-1 pt-2 border-t">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <ExternalLink className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <MessageSquare className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <FileText className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group applications by status
  const groupedApplications = applications.reduce((acc, app) => {
    if (!acc[app.status]) {
      acc[app.status] = [];
    }
    acc[app.status].push(app);
    return acc;
  }, {});

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      // This would update the application status in a real app
      console.log(`Moving ${active.id} to ${over.id}`);
    }
  };

  // Calculate progress
  const totalApplications = applications.length;
  const progressData = [
    { status: "applied", count: groupedApplications.applied?.length || 0 },
    { status: "interview", count: groupedApplications.interview?.length || 0 },
    { status: "offer", count: groupedApplications.offer?.length || 0 },
    { status: "hired", count: groupedApplications.hired?.length || 0 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">
            Track your job applications through the hiring process
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {progressData.map((item) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;
            const percentage = totalApplications > 0 ? (item.count / totalApplications) * 100 : 0;
            
            return (
              <Card key={item.status}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{item.count}</div>
                      <div className="text-sm text-muted-foreground">{config.title}</div>
                    </div>
                    <div className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <Progress value={percentage} className="mt-2 h-1" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Application Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Application Pipeline
            </CardTitle>
            <CardDescription>
              Drag and drop to update application status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="grid gap-4 md:grid-cols-4">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const Icon = config.icon;
                  const apps = groupedApplications[status] || [];
                  
                  return (
                    <div key={status} className="space-y-3">
                      {/* Column Header */}
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <div className={`w-4 h-4 rounded-full ${config.color}`}></div>
                        <div>
                          <div className="font-medium">{config.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {apps.length} {apps.length === 1 ? 'application' : 'applications'}
                          </div>
                        </div>
                      </div>

                      {/* Applications */}
                      <SortableContext
                        items={apps.map(app => app.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2 min-h-[200px]">
                          {apps.map((application, index) => (
                            <motion.div
                              key={application.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <SortableApplicationCard application={application} />
                            </motion.div>
                          ))}
                          
                          {apps.length === 0 && (
                            <div className="flex items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                              <div className="text-center">
                                <Icon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                <div className="text-sm text-muted-foreground">
                                  No {config.title.toLowerCase()} applications
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </SortableContext>
                    </div>
                  );
                })}
              </div>
            </DndContext>
          </CardContent>
        </Card>

        {/* Application Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Application Insights
              <Badge variant="secondary">AI</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">Success Rate</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Interview Rate</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Offer Rate</span>
                    <span className="font-medium">8.7%</span>
                  </div>
                  <Progress value={8.7} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Response Time</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Average Response</span>
                    <span className="font-medium">3.2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fastest Response</span>
                    <span className="font-medium">4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Industry Average</span>
                    <span className="text-muted-foreground">5.1 days</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">AI Recommendation</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Your response rate improves by 40% when you apply within 24 hours of job posting. 
                Consider setting up job alerts for faster applications.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}