import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Landing } from "@/pages/Landing";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Developers } from "@/pages/Developers";
import { TeacherAuth } from "@/pages/teacher/Auth";
import { CreateSession, SessionParams } from "@/pages/teacher/CreateSession";
import { LiveSession } from "@/pages/teacher/LiveSession";
import { StudentEntry } from "@/pages/student/Entry";
import { StudentScan } from "@/pages/student/Scan";
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminLogin } from "@/pages/admin/Login";
import { AttendanceSessions } from "@/pages/admin/AttendanceSessions";
import { Teachers } from "@/pages/admin/Teachers";
import { SystemSettings } from "@/pages/admin/SystemSettings";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type Page =
  | "landing"
  | "about"
  | "contact"
  | "developers"
  | "teacher-auth"
  | "teacher-create-session"
  | "teacher-live-session"
  | "student-entry"
  | "student-scan"
  | "admin-dashboard"
  | "admin-login"
  | "admin-sessions"
  | "admin-teachers"
  | "admin-settings";

// Pages where navbar should be hidden
const NAVBAR_HIDDEN_PAGES: Page[] = [
  "teacher-live-session",
  "student-scan",
  "admin-dashboard",
  "admin-login",
  "admin-sessions",
  "admin-teachers",
  "admin-settings",
];

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [sessionParams, setSessionParams] = useState<SessionParams | null>(null);
  const [studentRollNumber, setStudentRollNumber] = useState<number | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showNavbar = !NAVBAR_HIDDEN_PAGES.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <Landing onNavigate={handleNavigate} />;
      case "about":
        return <About onNavigate={handleNavigate} />;
      case "contact":
        return <Contact onNavigate={handleNavigate} />;
      case "developers":
        return <Developers onNavigate={handleNavigate} />;
      case "teacher-auth":
        return <TeacherAuth onNavigate={handleNavigate} />;
      case "teacher-create-session":
        return (
          <CreateSession
            onNavigate={handleNavigate}
            onStartSession={setSessionParams}
          />
        );
      case "teacher-live-session":
        return (
          <LiveSession
            onNavigate={handleNavigate}
            sessionParams={sessionParams}
          />
        );
      case "student-entry":
        return (
          <StudentEntry
            onNavigate={handleNavigate}
            onSetRollNumber={setStudentRollNumber}
          />
        );
      case "student-scan":
        return (
          <StudentScan
            onNavigate={handleNavigate}
            rollNumber={studentRollNumber}
          />
        );
      case "admin-dashboard":
        return <AdminDashboard onNavigate={handleNavigate} />;
      case "admin-login":
        return <AdminLogin onNavigate={handleNavigate} />;
      case "admin-sessions":
        return <AttendanceSessions onNavigate={handleNavigate} />;
      case "admin-teachers":
        return <Teachers onNavigate={handleNavigate} />;
      case "admin-settings":
        return <SystemSettings onNavigate={handleNavigate} />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Gradient Background */}
      <div className="animated-gradient-bg">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
        <div className="gradient-orb gradient-orb-4" />
      </div>
      
      <div className="relative z-10">
        {showNavbar && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}
        {renderPage()}
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
