import { useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
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
    expected: 50,
    marked: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45],
  },
  {
    id: "2",
    className: "Math 201 - Calculus",
    group: "Section B",
    date: "2024-01-15",
    time: "11:00 AM",
    expected: 40,
    marked: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
  },
];

export function AttendanceSessions({ onNavigate }: AttendanceSessionsProps) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const currentSession = mockSessions.find((s) => s.id === selectedSession);

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
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
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
                  className="w-full bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow text-left"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl mb-1">
                        {session.className}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {session.group}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {session.marked.length} / {session.expected}
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
                </div>
                <Button variant="outline" className="gap-2 rounded-xl">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>

              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl">Attendance Grid</h2>
                  <span className="px-4 py-1 rounded-full bg-success/10 text-success font-medium">
                    {currentSession.marked.length} / {currentSession.expected}{" "}
                    present
                  </span>
                </div>
                <RollGrid
                  expectedStudents={currentSession.expected}
                  markedStudents={currentSession.marked}
                  interactive={true}
                  onToggle={(roll) => {
                    // In a real app, this would update the backend
                    console.log("Toggle roll:", roll);
                  }}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
