"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useState, useRef, useEffect } from "react";
import { 
  Bot,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Monitor,
  Camera,
  Target,
  Trophy,
  Heart,
  Brain,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Zap,
  Circle,
  Square,
  PhoneOff,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Mock interview questions database
const interviewQuestions = {
  behavioral: [
    "Tell me about yourself and your background.",
    "Describe a challenging situation you faced at work and how you handled it.",
    "What are your greatest strengths and how do they apply to this role?",
    "Where do you see yourself in 5 years?",
    "Tell me about a time you worked in a team to achieve a goal.",
    "Describe a situation where you had to learn something new quickly.",
    "How do you handle stress and pressure?",
    "What motivates you in your work?",
  ],
  technical: [
    "Explain the difference between let, const, and var in JavaScript.",
    "How would you optimize a slow-performing database query?",
    "Describe the concept of object-oriented programming.",
    "What is the difference between HTTP and HTTPS?",
    "How do you ensure code quality in your projects?",
    "Explain the concept of responsive web design.",
    "What are some common security vulnerabilities in web applications?",
    "How would you debug a performance issue in a web application?",
  ],
  general: [
    "Why are you interested in this position?",
    "What do you know about our company?",
    "Why are you leaving your current job?",
    "What is your expected salary?",
    "Do you have any questions for us?",
    "How do you stay updated with industry trends?",
    "What makes you unique among other candidates?",
    "Describe your ideal work environment.",
  ]
};

const confidenceBuilders = [
  {
    title: "You belong here",
    message: "Remember: You were invited to this interview because you're qualified. Your skills and experience got you this far.",
    icon: Target,
    color: "text-blue-600",
  },
  {
    title: "Preparation beats perfection",
    message: "You don't need to be perfect. Authenticity and genuine interest matter more than having all the 'right' answers.",
    icon: Lightbulb,
    color: "text-yellow-600",
  },
  {
    title: "Growth mindset",
    message: "If you don't know something, it's okay to say so. Show your willingness to learn and grow.",
    icon: Brain,
    color: "text-purple-600",
  },
  {
    title: "Your unique value",
    message: "Focus on what unique perspective and value you bring to the team. Your background is an asset, not a liability.",
    icon: Star,
    color: "text-green-600",
  },
];

export default function AIInterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [sessionActive, setSessionActive] = useState(false);
  const [currentType, setCurrentType] = useState("behavioral");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    totalTime: 0,
    averageConfidence: 0,
  });
  const [showConfidenceBuilder, setShowConfidenceBuilder] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const videoRef = useRef(null);

  const startSession = (type) => {
    setCurrentType(type);
    setQuestionIndex(0);
    setSessionActive(true);
    setShowConfidenceBuilder(false);
    setSessionTime(0);
    
    const firstQuestion = interviewQuestions[type][0];
    setCurrentQuestion(firstQuestion);
    
    // Simulate AI speaking the question
    setAiSpeaking(true);
    setTimeout(() => setAiSpeaking(false), 3000);
    
    toast.success(`Started ${type} video interview session!`);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setCurrentResponse("Recording your response...");
      toast.success("Recording started");
    } else {
      setIsRecording(false);
      setCurrentResponse("");
      
      // Simulate processing and moving to next question
      setTimeout(() => {
        const nextIndex = questionIndex + 1;
        if (nextIndex < interviewQuestions[currentType].length) {
          setQuestionIndex(nextIndex);
          setCurrentQuestion(interviewQuestions[currentType][nextIndex]);
          setAiSpeaking(true);
          setTimeout(() => setAiSpeaking(false), 3000);
        } else {
          endSession();
        }
      }, 1000);
      
      setSessionStats(prev => ({
        ...prev,
        questionsAnswered: prev.questionsAnswered + 1,
      }));
      
      toast.success("Response recorded!");
    }
  };

  const endSession = () => {
    setSessionActive(false);
    setIsRecording(false);
    setShowConfidenceBuilder(true);
    toast.success("Interview session completed!");
  };

  const resetSession = () => {
    setSessionActive(false);
    setCurrentQuestion("");
    setQuestionIndex(0);
    setIsRecording(false);
    setShowConfidenceBuilder(false);
    setSessionTime(0);
    setCurrentResponse("");
    setSessionStats({
      questionsAnswered: 0,
      totalTime: 0,
      averageConfidence: 0,
    });
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toast.info(videoEnabled ? "Camera turned off" : "Camera turned on");
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    toast.info(audioEnabled ? "Microphone muted" : "Microphone unmuted");
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (sessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Camera className="w-8 h-8 text-primary" />
            AI Video Interview
            <Badge variant="secondary" className="ml-2">AI</Badge>
          </h1>
          <p className="text-muted-foreground">
            Practice video interviews with AI and build confidence to overcome imposter syndrome
          </p>
        </div>

        {!sessionActive ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Interview Types */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Choose Your Interview Practice
                  </CardTitle>
                  <CardDescription>
                    Select the type of interview you'd like to practice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/50" onClick={() => startSession("behavioral")}>
                        <CardContent className="p-6 text-center">
                          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                          <h3 className="font-semibold mb-2">Behavioral</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Practice storytelling and showcase your soft skills
                          </p>
                          <Badge variant="outline">{interviewQuestions.behavioral.length} questions</Badge>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/50" onClick={() => startSession("technical")}>
                        <CardContent className="p-6 text-center">
                          <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                          <h3 className="font-semibold mb-2">Technical</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Test your technical knowledge and problem-solving
                          </p>
                          <Badge variant="outline">{interviewQuestions.technical.length} questions</Badge>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/50" onClick={() => startSession("general")}>
                        <CardContent className="p-6 text-center">
                          <MessageSquare className="w-12 h-12 text-green-500 mx-auto mb-4" />
                          <h3 className="font-semibold mb-2">General</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Common interview questions and company fit
                          </p>
                          <Badge variant="outline">{interviewQuestions.general.length} questions</Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Confidence Building Tips */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Confidence Boosters
                  </CardTitle>
                  <CardDescription>
                    Tips to overcome imposter syndrome
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {confidenceBuilders.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <tip.icon className={`w-5 h-5 mt-0.5 ${tip.color}`} />
                        <div>
                          <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                          <p className="text-xs text-muted-foreground">{tip.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Video Interview Interface */}
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Main Video Area */}
              <div className="lg:col-span-3">
                <Card className="overflow-hidden">
                  {/* Video Controls Bar */}
                  <div className="bg-gray-900 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                          <span className="text-sm font-medium">
                            {isRecording ? 'RECORDING' : sessionActive ? 'LIVE' : 'READY'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">
                          {formatTime(sessionTime)} • Question {questionIndex + 1}/{interviewQuestions[currentType].length}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={toggleVideo}
                          className={`text-white hover:bg-gray-700 ${!videoEnabled ? 'bg-red-600 hover:bg-red-700' : ''}`}
                        >
                          {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={toggleAudio}
                          className={`text-white hover:bg-gray-700 ${!audioEnabled ? 'bg-red-600 hover:bg-red-700' : ''}`}
                        >
                          {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-white hover:bg-gray-700"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={resetSession}
                        >
                          <PhoneOff className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Video Feed Area */}
                  <div className="relative bg-gray-900 aspect-video">
                    {/* AI Interviewer Video */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                        <motion.div
                          animate={aiSpeaking ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ duration: 1, repeat: aiSpeaking ? Infinity : 0 }}
                          className="text-center"
                        >
                          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white/20">
                            <AvatarFallback className="bg-white/10 text-white text-2xl backdrop-blur">
                              <Bot className="w-12 h-12" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-white">
                            <h3 className="text-xl font-semibold">AI Interview Coach</h3>
                            <p className="text-blue-200 text-sm">Senior Recruiter</p>
                            {aiSpeaking && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 flex items-center justify-center gap-1"
                              >
                                <Circle className="w-2 h-2 fill-current animate-bounce" style={{ animationDelay: '0ms' }} />
                                <Circle className="w-2 h-2 fill-current animate-bounce" style={{ animationDelay: '150ms' }} />
                                <Circle className="w-2 h-2 fill-current animate-bounce" style={{ animationDelay: '300ms' }} />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* User Video (Picture-in-Picture) */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white/20 overflow-hidden">
                      {videoEnabled ? (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-xs opacity-75">Your Camera</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <VideoOff className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Recording indicator on user video */}
                      {isRecording && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 px-2 py-1 rounded text-white text-xs">
                          <Circle className="w-2 h-2 fill-current animate-pulse" />
                          REC
                        </div>
                      )}
                    </div>

                    {/* Audio Wave Animation */}
                    {audioEnabled && isRecording && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-green-400 rounded-full"
                            animate={{
                              height: [4, 16, 4],
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Question Display */}
                  <div className="p-6 bg-white dark:bg-gray-900">
                    {currentQuestion && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Question {questionIndex + 1}</Badge>
                          <Badge variant="secondary" className="capitalize">{currentType}</Badge>
                        </div>
                        <div className="text-lg font-medium leading-relaxed">
                          {currentQuestion}
                        </div>
                        {currentResponse && (
                          <div className="text-sm text-green-600 bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                            {currentResponse}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Recording Controls */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t">
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        onClick={toggleRecording}
                        className={`h-12 px-8 ${
                          isRecording 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <Square className="w-4 h-4 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4 mr-2" />
                            Start Response
                          </>
                        )}
                      </Button>
                      
                      {!isRecording && (
                        <Button variant="outline" onClick={resetSession}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          End Interview
                        </Button>
                      )}
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      {isRecording 
                        ? "Click 'Stop Recording' when you finish your answer" 
                        : "Click 'Start Response' to begin recording your answer"
                      }
                    </p>
                  </div>
                </Card>
              </div>

              {/* Session Info */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Monitor className="w-5 h-5" />
                      Video Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{questionIndex + 1}/{interviewQuestions[currentType].length}</span>
                      </div>
                      <Progress value={((questionIndex + 1) / interviewQuestions[currentType].length) * 100} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{sessionStats.questionsAnswered}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{formatTime(sessionTime)}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                    </div>

                    {/* Video Status */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Camera & Audio</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Camera</span>
                          <Badge variant={videoEnabled ? "default" : "destructive"}>
                            {videoEnabled ? "On" : "Off"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Microphone</span>
                          <Badge variant={audioEnabled ? "default" : "destructive"}>
                            {audioEnabled ? "On" : "Muted"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Recording</span>
                          <Badge variant={isRecording ? "destructive" : "secondary"}>
                            {isRecording ? "Active" : "Stopped"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Confidence Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Live Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">Camera Presence</h4>
                      <p className="text-xs text-blue-800 dark:text-blue-200 mt-1">
                        Look directly at the camera when speaking. Maintain good posture and eye contact.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <h4 className="font-medium text-green-900 dark:text-green-100 text-sm">Be Natural</h4>
                      <p className="text-xs text-green-800 dark:text-green-200 mt-1">
                        Take your time. It's okay to pause and think before answering.
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                      <h4 className="font-medium text-purple-900 dark:text-purple-100 text-sm">Stay Confident</h4>
                      <p className="text-xs text-purple-800 dark:text-purple-200 mt-1">
                        Remember: You're here because you're qualified. Show your personality!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {showConfidenceBuilder && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-green-200 bg-green-50 dark:bg-green-950/30">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-800 dark:text-green-200 flex items-center gap-2">
                          <Trophy className="w-5 h-5" />
                          Video Session Complete!
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Excellent! You've completed a full video interview simulation. Your confidence is growing!
                        </p>
                        <div className="text-xs text-green-600 dark:text-green-400 space-y-1">
                          <div>• Session Duration: {formatTime(sessionTime)}</div>
                          <div>• Questions Answered: {sessionStats.questionsAnswered + 1}</div>
                          <div>• Interview Type: {currentType}</div>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={resetSession}
                          variant="outline"
                        >
                          Start New Video Session
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}