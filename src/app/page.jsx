"use client";

import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, UserCog, Users, ArrowRight, TrendingUp, Briefcase, Code, Palette, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { role, switchRole } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleRoleSelect = (selectedRole) => {
    switchRole(selectedRole);
    if (selectedRole === "recruiter") {
      router.push("/recruiter/dashboard");
    } else {
      router.push("/seeker/profile");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Route to job seeker portal with search
      switchRole("seeker");
      router.push(`/seeker/jobs?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const popularSearches = [
    { term: "Developer", icon: Code, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { term: "Designer", icon: Palette, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
    { term: "Marketing", icon: TrendingUp, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    { term: "Sales", icon: BarChart3, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  ];

  const handlePopularSearch = (term) => {
    setSearchTerm(term);
    switchRole("seeker");
    router.push(`/seeker/jobs?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Discover Your{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Dream Career
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Find the perfect job opportunity that matches your skills and career goals. 
                Join our AI-powered platform connecting talent with opportunities.
              </motion.p>
            </div>

            {/* Search Section */}
            <motion.div 
              className="max-w-2xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for jobs, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-32 h-14 text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary"
                  />
                  <Button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10"
                  >
                    Search Jobs
                  </Button>
                </div>
              </form>

              {/* Popular Searches */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Popular searches:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularSearches.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.term}
                        onClick={() => handlePopularSearch(item.term)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${item.color}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        {item.term}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                onClick={() => handleRoleSelect("seeker")}
                size="lg"
                className="flex items-center gap-2 h-12"
              >
                <Briefcase className="w-5 h-5" />
                Browse Open Positions
              </Button>
              <Button
                onClick={() => handleRoleSelect("recruiter")}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 h-12"
              >
                <UserCog className="w-5 h-5" />
                For Recruiters
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Next Role</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes job discovery and recruitment smarter and more efficient
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => handleRoleSelect("seeker")}>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">For Job Seekers</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Discover personalized job opportunities with AI-powered matching. 
                        Get career guidance and track your applications seamlessly.
                      </p>
                    </div>
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Start your journey</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => handleRoleSelect("recruiter")}>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <UserCog className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">For Recruiters</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Find top talent with intelligent candidate screening. 
                        Streamline your hiring process with comprehensive analytics.
                      </p>
                    </div>
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Hire better, faster</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-primary-foreground/80">Active Jobs</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-foreground/80">Job Seekers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">1K+</div>
              <div className="text-primary-foreground/80">Companies</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
