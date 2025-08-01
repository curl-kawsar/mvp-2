"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockJobs } from "@/lib/mock-data";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Briefcase,
  Clock,
  Heart,
  ExternalLink,
  Star,
  Zap,
  Building
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Component that uses useSearchParams
function SearchParamsHandler({ onSearchUpdate }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      onSearchUpdate(decodeURIComponent(urlSearch));
    }
  }, [searchParams, onSearchUpdate]);

  return null;
}

// Main component
function SeekerJobsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs] = useState(mockJobs);
  const [savedJobs, setSavedJobs] = useState(new Set());

  const handleSearchUpdate = (search) => {
    setSearchTerm(search);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (savedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
      toast.success("Job removed from saved");
    } else {
      newSavedJobs.add(jobId);
      toast.success("Job saved successfully");
    }
    setSavedJobs(newSavedJobs);
  };

  const handleApply = (job) => {
    toast.success(`Applied to ${job.title} at ${job.company}`);
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler onSearchUpdate={handleSearchUpdate} />
      </Suspense>
      <DashboardLayout>
        <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Search</h1>
          <p className="text-muted-foreground">
            Discover personalized job opportunities with AI-powered matching
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search jobs by title, company, location, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-blue-50 dark:to-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              AI-Powered Recommendations
              <Badge variant="secondary">AI</Badge>
            </CardTitle>
            <CardDescription>
              Jobs specially curated for your profile and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>3 new jobs match your Senior Full Stack Developer profile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Companies in your network are hiring for similar roles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Salary range 15% above your expectations available</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="grid gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-12 h-12 rounded-lg"
                        />
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 text-base">
                            <Building className="w-4 h-4" />
                            {job.company}
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Posted {new Date(job.posted).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {job.tags?.map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex} 
                            variant={tag === "Best Fit" ? "default" : "secondary"}
                            className={tag === "Best Fit" ? "bg-green-600" : ""}
                          >
                            {tag === "Best Fit" && <Star className="w-3 h-3 mr-1" />}
                            {tag}
                          </Badge>
                        ))}
                        {job.remote && <Badge variant="outline">Remote</Badge>}
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getMatchScoreColor(job.matchScore)}`}>
                        {job.matchScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Match</div>
                      <div className="flex mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(job.matchScore / 20)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                    
                    {/* Skills */}
                    <div>
                      <div className="text-sm font-medium mb-2">Required Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 6).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSaveJob(job.id)}
                          className={savedJobs.has(job.id) ? "text-red-500" : ""}
                        >
                          <Heart 
                            className={`w-4 h-4 mr-1 ${
                              savedJobs.has(job.id) ? "fill-current" : ""
                            }`} 
                          />
                          {savedJobs.has(job.id) ? "Saved" : "Save"}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        {job.matchScore >= 85 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApply(job)}
                          >
                            Quick Apply
                          </Button>
                        )}
                        <Button 
                          onClick={() => handleApply(job)}
                          size="sm"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or explore recommended jobs.
                  </p>
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Adjust Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center pt-4">
            <Button variant="outline">
              Load More Jobs
            </Button>
          </div>
        )}
        </div>
      </DashboardLayout>
    </>
  );
}

// Main export with Suspense wrapper
export default function SeekerJobsPage() {
  return <SeekerJobsContent />;
}
