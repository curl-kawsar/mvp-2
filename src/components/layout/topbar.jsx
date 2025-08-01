"use client";

import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Menu,
  Sun,
  Moon,
  UserCog,
  Users,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar({ onToggleSidebar }) {
  const { user, role, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Page title would go here - can be passed as prop */}
      <div className="flex-1 md:flex-none">
        <h1 className="text-lg font-semibold capitalize">
          {role === "recruiter" ? "Recruiter Portal" : "Job Seeker Portal"}
        </h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Role Switcher */}
        <div className="hidden md:flex items-center space-x-2">
          <UserCog className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Recruiter</span>
          <Switch
            checked={role === "seeker"}
            onCheckedChange={(checked) => {
              switchRole(checked ? "seeker" : "recruiter");
            }}
          />
          <span className="text-sm text-muted-foreground">Job Seeker</span>
        </div>

        {/* Theme Toggle */}
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </motion.div>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Mobile role switcher */}
            <div className="md:hidden px-2 py-1.5">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Switch to:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => switchRole(role === "recruiter" ? "seeker" : "recruiter")}
                >
                  {role === "recruiter" ? (
                    <>
                      <Users className="h-3 w-3 mr-1" />
                      Job Seeker
                    </>
                  ) : (
                    <>
                      <UserCog className="h-3 w-3 mr-1" />
                      Recruiter
                    </>
                  )}
                </Button>
              </div>
            </div>
            <DropdownMenuSeparator className="md:hidden" />
            
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}