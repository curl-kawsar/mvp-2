"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockInterviews, mockCandidates } from "@/lib/mock-data";
import { useState } from "react";
import { 
  Calendar,
  Clock,
  Video,
  Plus,
  Users,
  MessageSquare,
  FileText,
  Star,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState(mockInterviews);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Group interviews by status
  const groupedInterviews = interviews.reduce((acc, interview) => {
    if (!acc[interview.status]) {
      acc[interview.status] = [];
    }
    acc[interview.status].push(interview);
    return acc;
  }, {});

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getCandidateById = (candidateId) => {
    return mockCandidates.find(c => c.id === candidateId);
  };

  const handleStartInterview = (interview) => {
    setSelectedInterview(interview);
    setNotes(interview.notes || "");
    setRating(interview.rating || 0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  const handleCompleteInterview = () => {
    // Update interview status
    setInterviews(prev => prev.map(interview => 
      interview.id === selectedInterview.id
        ? { ...interview, status: "completed", notes, rating }
        : interview
    ));
    
    setSelectedInterview(null);
    setIsTimerRunning(false);
    toast.success("Interview completed and notes saved!");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useState(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
            <p className="text-muted-foreground">
              Manage interviews with AI-powered question suggestions
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{groupedInterviews.scheduled?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Scheduled</div>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{groupedInterviews.completed?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm text-muted-foreground">Avg Duration (min)</div>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">4.2</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="scheduled" className="space-y-6">
          <TabsList>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          {/* Scheduled Interviews */}
          <TabsContent value="scheduled" className="space-y-4">
            {(groupedInterviews.scheduled || []).map((interview, index) => {
              const candidate = getCandidateById(interview.candidateId);
              
              return (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={candidate?.avatar} />
                            <AvatarFallback>
                              {candidate?.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-1">
                            <h3 className="font-medium">{candidate?.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate?.title}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {interview.date} at {interview.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {interview.duration} minutes
                              </div>
                              <Badge variant="outline">{interview.type}</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4 mr-1" />
                            Join Meeting
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleStartInterview(interview)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Start Interview
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Interviewers: </span>
                            {interview.interviewers.join(", ")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm">ATS Score: {candidate?.atsScore}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {(!groupedInterviews.scheduled || groupedInterviews.scheduled.length === 0) && (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No Scheduled Interviews</h3>
                  <p className="text-muted-foreground mb-4">
                    Schedule interviews with candidates to get started.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Interviews */}
          <TabsContent value="completed" className="space-y-4">
            {(groupedInterviews.completed || []).map((interview, index) => {
              const candidate = getCandidateById(interview.candidateId);
              
              return (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={candidate?.avatar} />
                            <AvatarFallback>
                              {candidate?.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-1">
                            <h3 className="font-medium">{candidate?.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate?.title}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {interview.date}
                              </div>
                              <Badge variant="outline">{interview.type}</Badge>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < (interview.rating || 0)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="ml-1">{interview.rating}/5</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            View Notes
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Follow Up
                          </Button>
                        </div>
                      </div>
                      
                      {interview.notes && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="text-sm">
                            <span className="font-medium">Notes: </span>
                            <span className="text-muted-foreground">{interview.notes}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Calendar Integration</h3>
                <p className="text-muted-foreground">
                  Calendar view would be integrated here with a proper calendar library
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Interview Modal */}
        <Dialog open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedInterview && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isTimerRunning ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span>Interview in Progress</span>
                    </div>
                    <div className="text-2xl font-mono">{formatTime(timerSeconds)}</div>
                  </DialogTitle>
                  <DialogDescription>
                    {selectedInterview.type} interview with {getCandidateById(selectedInterview.candidateId)?.name}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Interview Questions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        AI-Suggested Questions
                        <Badge variant="secondary">AI</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedInterview.questions.map((question, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{question}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Notes & Rating */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Interview Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Take notes during the interview..."
                          className="min-h-[200px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Overall Rating</Label>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 cursor-pointer ${
                                i < rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}
                              onClick={() => setRating(i + 1)}
                            />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {rating}/5
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Interview Controls */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Resume
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setTimerSeconds(0)}
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset Timer
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSelectedInterview(null)}>
                      Save & Close
                    </Button>
                    <Button onClick={handleCompleteInterview}>
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Complete Interview
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}