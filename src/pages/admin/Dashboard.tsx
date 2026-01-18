import { ArrowLeft, Users, Calendar, Settings, LogOut } from "lucide-react";
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
  { id: "admin-sessions", label: "Attendance Sessions", icon: Calendar, description: "View and manage attendance records" },
  { id: "admin-teachers", label: "Teachers", icon: Users, description: "Add, edit, or remove teachers" },
  { id: "admin-settings", label: "System Settings", icon: Settings, description: "Configure system preferences" },
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const handleLogout = () => {
    // In a real app, this would clear the session
    onNavigate("admin-login");
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label="Go back to home"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-xl gap-2"
            aria-label="Logout from admin panel"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Logout
          </Button>
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
                aria-hidden="true"
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Cards */}
        <h2 className="font-serif text-xl mb-4">Quick Access</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="bg-card rounded-2xl p-6 border border-border text-left hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={`Go to ${link.label}`}
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                <link.icon className="w-6 h-6 text-foreground" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{link.label}</h3>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
