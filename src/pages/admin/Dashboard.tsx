import { ArrowLeft, Users, Calendar, Settings, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const quickStats = [
  { label: "Total Sessions", value: "156", icon: Calendar, color: "bg-secondary" },
  { label: "Total Students", value: "1,240", icon: Users, color: "bg-accent" },
  { label: "Active Teachers", value: "24", icon: Users, color: "bg-primary" },
];

const navLinks = [
  { id: "admin-login", label: "Admin Login", icon: LogIn },
  { id: "admin-sessions", label: "Attendance Sessions", icon: Calendar },
  { id: "admin-teachers", label: "Teachers", icon: Users },
  { id: "admin-settings", label: "System Settings", icon: Settings },
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-medium">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage attendance, teachers, and system settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <div
                className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {navLinks.map((link) => (
            <Button
              key={link.id}
              variant="outline"
              onClick={() => onNavigate(link.id)}
              className="h-auto py-6 px-6 rounded-2xl justify-start gap-4 hover:bg-muted/50"
            >
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                <link.icon className="w-6 h-6" />
              </div>
              <span className="font-medium text-lg">{link.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
