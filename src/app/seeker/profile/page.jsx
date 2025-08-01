"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { 
  Upload, 
  FileText, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Zap,
  MessageSquare,
  Bot,
  Target
} from "lucide-react";
import { motion } from "framer-motion";

export default function SeekerProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    title: "Full Stack Developer",
    summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies.",
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        period: "2022 - Present",
        description: "Leading development of microservices architecture, mentoring junior developers."
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2020 - 2022",
        description: "Built customer-facing web applications from scratch using React and Node.js."
      }
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        school: "UC Berkeley",
        period: "2016 - 2020",
        gpa: "3.8"
      }
    ],
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "GraphQL"],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    languages: ["English (Native)", "Spanish (Conversational)"]
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      toast.success("Resume uploaded successfully!");
      // Mock file processing
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your professional profile and upload your resume
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{profile.name}</CardTitle>
                <CardDescription>{profile.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-primary">{profile.website}</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Edit Photo
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completeness</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">156</div>
                    <div className="text-xs text-muted-foreground">Profile Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-xs text-muted-foreground">Applications</div>
                  </div>
                </div>
                
                <Button className="w-full" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Improve Profile
                </Button>
              </CardContent>
            </Card>

            {/* AI Interview Coach Promotion */}
            <Card className="mt-6 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  Interview Ready?
                  <Badge variant="secondary" className="ml-auto">AI</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Practice with our AI Video Interview Coach and build confidence to overcome imposter syndrome.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                    <Target className="w-3 h-3" />
                    <span>Video interview simulation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                    <MessageSquare className="w-3 h-3" />
                    <span>Camera & audio controls</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  size="sm"
                  onClick={() => router.push('/seeker/interview')}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Start Video Session
                </Button>
                
                <div className="text-xs text-center text-blue-600 dark:text-blue-400">
                  Video interview practice • Build confidence
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Resume Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Upload
                  <Badge variant="secondary">AI</Badge>
                </CardTitle>
                <CardDescription>
                  Upload your resume and let AI extract your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  {isDragActive ? (
                    <p className="text-primary">Drop your resume here...</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Drop your resume here</p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse files (PDF, DOC, DOCX)
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-900 dark:text-blue-100">AI Enhancement Available</div>
                      <div className="text-blue-700 dark:text-blue-300">
                        Our AI will automatically extract and organize your experience, skills, and education.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={profile.summary}
                    onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="mt-4">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Manage Skills
                </Button>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-primary/20 pl-4 pb-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{exp.title}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </p>
                        <p className="text-sm mt-2">{exp.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-secondary/20 pl-4">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        GPA: {edu.gpa}
                      </span>
                    </p>
                  </div>
                ))}
                <Button variant="outline">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">Preview Profile</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}