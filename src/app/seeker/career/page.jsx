"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSkills, mockCareerPaths } from "@/lib/mock-data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Play, 
  Star, 
  Clock,
  DollarSign,
  Award,
  ArrowRight,
  Zap,
  Users,
  BarChart3,
  ExternalLink,
  Bot,
  MessageSquare
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";

export default function CareerPage() {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState(mockCareerPaths[0]);

  // Prepare radar chart data
  const radarData = mockSkills.slice(0, 6).map(skill => ({
    skill: skill.name,
    current: skill.level,
    target: Math.min(skill.level + 20, 100),
    market: skill.level + (Math.random() * 10 - 5)
  }));

  // Prepare skills trend data
  const skillsTrendData = mockSkills.map(skill => ({
    name: skill.name,
    level: skill.level,
    demand: skill.demand === "High" ? 90 : skill.demand === "Medium" ? 60 : 30,
    growth: parseInt(skill.growth.replace('+', '').replace('%', ''))
  }));

  const getDemandColor = (demand) => {
    switch (demand) {
      case "High": return "text-green-600 bg-green-100 dark:bg-green-900";
      case "Medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Guidance</h1>
          <p className="text-muted-foreground">
            AI-powered career insights and personalized learning paths
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">73%</div>
                  <div className="text-sm text-muted-foreground">Market Readiness</div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground">Skill Gaps</div>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Learning Hours</div>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">$15K</div>
                  <div className="text-sm text-muted-foreground">Potential Increase</div>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview Preparation */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                    Ready for Video Interviews?
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Practice with our AI Video Interview Coach and overcome imposter syndrome
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => router.push('/seeker/interview')}
                className="bg-green-600 hover:bg-green-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            <TabsTrigger value="paths">Career Paths</TabsTrigger>
            <TabsTrigger value="market">Market Insights</TabsTrigger>
          </TabsList>

          {/* Skills Analysis Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Skill Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Skills Radar
                    <Badge variant="secondary">AI</Badge>
                  </CardTitle>
                  <CardDescription>
                    Your skills vs market expectations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name="Current Level"
                        dataKey="current"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Target Level"
                        dataKey="target"
                        stroke="hsl(var(--secondary))"
                        fill="hsl(var(--secondary))"
                        fillOpacity={0.1}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skill Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Breakdown</CardTitle>
                  <CardDescription>
                    Detailed analysis of your technical skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSkills.slice(0, 6).map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDemandColor(skill.demand)}`}
                          >
                            {skill.demand}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>{skill.level}%</span>
                          <span className="text-green-600">{skill.growth}</span>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI-Powered Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Priority Skill: TypeScript
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                      90% of Full Stack roles now require TypeScript. Focus here for maximum impact.
                    </p>
                    <Button size="sm" variant="outline">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Learn TypeScript
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                      Emerging Trend: AI/ML
                    </h4>
                    <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                      Basic AI knowledge increases salary by 25%. Consider adding to your skillset.
                    </p>
                    <Button size="sm" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Explore AI
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                    <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                      Certification Path
                    </h4>
                    <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                      AWS certification aligns with 80% of your target roles.
                    </p>
                    <Button size="sm" variant="outline">
                      <Award className="w-4 h-4 mr-1" />
                      View Certs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Career Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Path Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Choose Your Path</h3>
                {mockCareerPaths.map((path) => (
                  <Card 
                    key={path.id}
                    className={`cursor-pointer transition-all ${
                      selectedPath.id === path.id 
                        ? 'ring-2 ring-primary' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedPath(path)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">{path.target}</h4>
                        <p className="text-sm text-muted-foreground">
                          From {path.current}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{path.timeframe}</span>
                        </div>
                        <div className="text-sm font-medium text-green-600">
                          {path.salary.increase} salary increase
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Path Details */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedPath.target}</span>
                      <Badge variant="outline">{selectedPath.timeframe}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Career transition roadmap with skill gaps and resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Salary Projection */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold">{selectedPath.salary.current}</div>
                          <div className="text-sm text-muted-foreground">Current</div>
                        </div>
                        <ArrowRight className="w-6 h-6 mx-auto mt-2 text-muted-foreground" />
                        <div>
                          <div className="text-lg font-bold text-green-600">{selectedPath.salary.target}</div>
                          <div className="text-sm text-muted-foreground">Target</div>
                        </div>
                      </div>
                    </div>

                    {/* Skill Gaps */}
                    <div>
                      <h4 className="font-medium mb-3">Skills to Develop</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPath.skillGaps.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-red-50 dark:bg-red-950/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="font-medium mb-3">Recommended Resources</h4>
                      <div className="space-y-3">
                        {selectedPath.resources.map((resource, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-1">
                                    <h5 className="font-medium">{resource.title}</h5>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Badge variant="outline" className="text-xs">
                                        {resource.type}
                                      </Badge>
                                      <span>{resource.provider}</span>
                                      <span>•</span>
                                      <span>{resource.duration}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm">{resource.rating}</span>
                                    </div>
                                    <Button size="sm" variant="outline">
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Market Insights Tab */}
          <TabsContent value="market" className="space-y-6">
            {/* Skills Demand Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Market Demand</CardTitle>
                <CardDescription>
                  Current skill level vs market demand and growth trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={skillsTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="level" fill="hsl(var(--primary))" name="Your Level" />
                    <Bar dataKey="demand" fill="hsl(var(--secondary))" name="Market Demand" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Growing Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { tech: "TypeScript", growth: "+35%", demand: "Very High" },
                    { tech: "GraphQL", growth: "+28%", demand: "High" },
                    { tech: "Docker", growth: "+22%", demand: "High" },
                    { tech: "Kubernetes", growth: "+40%", demand: "Medium" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.tech}</div>
                        <div className="text-sm text-muted-foreground">{item.demand} demand</div>
                      </div>
                      <div className="text-green-600 font-medium">{item.growth}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Industry Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Tech Hiring Trends</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                      Remote-first companies are leading salary increases in 2024
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100">Skill Premium</h4>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Full-stack developers with cloud skills earn 25% more
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                    <h4 className="font-medium text-purple-900 dark:text-purple-100">Location Factor</h4>
                    <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                      San Francisco Bay Area offers highest compensation
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}