"use client";

import { useAuth } from "@/context/auth-context";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  BarChart3,
  User,
  Search,
  Kanban,
  TrendingUp,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const recruiterNavItems = [
  {
    title: "Dashboard",
    href: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    href: "/recruiter/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    href: "/recruiter/candidates",
    icon: Users,
  },
  {
    title: "Interviews",
    href: "/recruiter/interviews",
    icon: Calendar,
  },
  {
    title: "Analytics",
    href: "/recruiter/analytics",
    icon: BarChart3,
  },
];

const seekerNavItems = [
  {
    title: "Profile",
    href: "/seeker/profile",
    icon: User,
  },
  {
    title: "Jobs",
    href: "/seeker/jobs",
    icon: Search,
  },
  {
    title: "Applications",
    href: "/seeker/applications",
    icon: Kanban,
  },
  {
    title: "AI Interview",
    href: "/seeker/interview",
    icon: MessageSquare,
  },
  {
    title: "Career",
    href: "/seeker/career",
    icon: TrendingUp,
  },
];

export default function Sidebar({ collapsed, onToggleCollapse }) {
  const { role } = useAuth();
  const pathname = usePathname();
  
  const navItems = role === "recruiter" ? recruiterNavItems : seekerNavItems;

  return (
    <motion.aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-semibold">ChakriKhujo</span>
            </motion.div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <span className="text-lg font-bold text-primary-foreground">C</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-full justify-center"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}