import { useState } from "react";
import { ArrowLeft, Download, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RollGrid } from "@/components/RollGrid";

interface AttendanceSessionsProps {
  onNavigate: (page: string) => void;
}

const mockSessions = [
  {
    id: "1",
    className: "CS 101 - Introduction",
    group: "Section A",
    date: "2024-01-15",
    time: "09:00 AM",
    duration: 5,
    expected: 50,
    marked: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45],
  },
  {
    id: "2",
    className: "Math 201 - Calculus",
    group: "Section B",
    date: "2024-01-15",
    time: "11:00 AM",
    duration: 10,
    expected: 40,
    marked: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
  },
  {
    id: "3",
    className: "Physics 301 - Mechanics",
    group: "Lab Group 1",
    date: "2024-01-14",
    time: "02:00 PM",
    duration: 15,
    expected: 30,
    marked: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  },
];

export function AttendanceSessions({ onNavigate }: AttendanceSessionsProps) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [sessionMarked, setSessionMarked] = useState<Record<string, number[]>>({});

  const currentSession = mockSessions.find((s) => s.id === selectedSession);

  // Get current marked students for a session (from local state or mock data)
  const getMarkedStudents = (sessionId: string) => {
    if (sessionMarked[sessionId]) {
      return sessionMarked[sessionId];
    }
    const session = mockSessions.find((s) => s.id === sessionId);
    return session?.marked || [];
  };

  // Toggle a student's attendance
  const handleToggle = (roll: number) => {
    if (!selectedSession) return;
    
    const current = getMarkedStudents(selectedSession);
    const newMarked = current.includes(roll)
      ? current.filter((r) => r !== roll)
      : [...current, roll];
    
    setSessionMarked((prev) => ({
      ...prev,
      [selectedSession]: newMarked,
    }));
  };

  const handleExport = () => {
    // In a real app, this would export to CSV/PDF
    console.log("Exporting session data...");
    alert("Export functionality would download session data as CSV/PDF");
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() =>
              selectedSession
                ? setSelectedSession(null)
                : onNavigate("admin-dashboard")
            }
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label={selectedSession ? "Back to sessions list" : "Back to dashboard"}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {selectedSession ? "Back to Sessions" : "Back to Dashboard"}
          </button>
        </div>

        {!selectedSession ? (
          <>
            {/* Session List */}
            <h1 className="font-serif text-3xl md:text-4xl font-medium mb-8">
              Attendance Sessions
            </h1>

            <div className="space-y-4">
              {mockSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session.id)}
                  className="w-full bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow text-left focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label={`View session ${session.className}, ${session.marked.length} of ${session.expected} present`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl mb-1">
                        {session.className}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {session.group}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          {session.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" aria-hidden="true" />
                          {session.marked.length} / {session.expected}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success">
                        {Math.round((session.marked.length / session.expected) * 100)}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {session.date} • {session.time}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          currentSession && (
            <>
              {/* Session Detail */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <h1 className="font-serif text-3xl font-medium">
                    {currentSession.className}
                  </h1>
                  <p className="text-muted-foreground">
                    {currentSession.group} • {currentSession.date} •{" "}
                    {currentSession.time}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Duration: {currentSession.duration} minutes
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="gap-2 rounded-xl"
                  onClick={handleExport}
                  aria-label="Export attendance data"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Export
                </Button>
              </div>

              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl">Attendance Grid</h2>
                  <span 
                    className="px-4 py-1.5 rounded-full bg-success/10 text-success font-medium"
                    aria-live="polite"
                  >
                    {getMarkedStudents(currentSession.id).length} / {currentSession.expected}{" "}
                    present
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Click on a cell to toggle attendance status
                </p>
                <RollGrid
                  expectedStudents={currentSession.expected}
                  markedStudents={getMarkedStudents(currentSession.id)}
                  interactive={true}
                  onToggle={handleToggle}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
