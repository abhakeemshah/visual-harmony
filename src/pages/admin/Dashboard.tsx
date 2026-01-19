import { useState } from "react";
import { Users, Calendar, UserCheck, Eye, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/AdminLayout";
import { RollGrid } from "@/components/RollGrid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const statsCards = [
  { label: "Total Teachers", value: "24", subtitle: "Registered accounts", icon: Users, color: "bg-secondary" },
  { label: "Sessions Today", value: "8", subtitle: "Across all teachers", icon: Calendar, color: "bg-accent" },
  { label: "Attendance Today", value: "342", subtitle: "Students marked present", icon: UserCheck, color: "bg-success" },
];

const todaysSessions = [
  {
    id: "1",
    teacherName: "Prof. John Smith",
    teacherId: "T001",
    className: "CS 101",
    semester: "1st",
    markedCount: 45,
    sessionCount: 2,
    time: "09:30 - 10:30",
    expected: 50,
    marked: [1, 2, 3, 4, 5, 7, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 43, 44, 45, 46, 47, 48, 49, 50, 3, 6, 9, 11, 13, 14, 16, 17, 19, 21, 23, 24, 26, 27, 29, 31],
  },
  {
    id: "2",
    teacherName: "Dr. Sarah Johnson",
    teacherId: "T002",
    className: "Math 201",
    semester: "2nd",
    markedCount: 38,
    sessionCount: 1,
    time: "11:30 - 12:30",
    expected: 40,
    marked: [1, 2, 4, 5, 6, 8, 9, 10, 12, 14, 15, 17, 18, 20, 21, 23, 24, 26, 27, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 3, 7, 11, 13, 16, 19, 22, 25],
  },
  {
    id: "3",
    teacherName: "Prof. Michael Brown",
    teacherId: "T003",
    className: "Physics 301",
    semester: "1st",
    markedCount: 28,
    sessionCount: 1,
    time: "14:30 - 15:30",
    expected: 30,
    marked: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  },
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [selectedSession, setSelectedSession] = useState<typeof todaysSessions[0] | null>(null);

  const handleDownload = (session: typeof todaysSessions[0]) => {
    const csvContent = [
      "Roll Number,Status",
      ...Array.from({ length: session.expected }, (_, i) => {
        const roll = i + 1;
        const status = session.marked.includes(roll) ? "Present" : "Absent";
        return `${roll},${status}`;
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${session.className}_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout currentPage="admin-dashboard" onNavigate={onNavigate}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <div
              className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
              aria-hidden="true"
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Today's Sessions Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif text-xl">Today's Sessions</h2>
        </div>

        {todaysSessions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaysSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{session.teacherName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{session.teacherId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{session.className}</p>
                      <p className="text-xs text-muted-foreground">{session.semester} Semester</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-success">{session.markedCount}</span>
                    <span className="text-muted-foreground"> / {session.expected}</span>
                  </TableCell>
                  <TableCell>{session.sessionCount}</TableCell>
                  <TableCell className="text-muted-foreground">{session.time}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedSession(session)}
                        className="rounded-xl"
                        aria-label={`View session ${session.className}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(session)}
                        className="rounded-xl"
                        aria-label={`Download attendance for ${session.className}`}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-1">No sessions today</p>
            <p className="text-sm text-muted-foreground">Sessions will appear here once teachers start them</p>
          </div>
        )}
      </div>

      {/* Session Detail Modal */}
      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="font-serif text-xl">
                  {selectedSession?.className}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedSession?.teacherName} • {selectedSession?.time}
                </p>
              </div>
            </div>
          </DialogHeader>

          {selectedSession && (
            <div className="mt-4">
              <RollGrid
                expectedStudents={selectedSession.expected}
                markedStudents={selectedSession.marked}
                interactive={false}
              />

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-success" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">Present</span>
                </div>
              </div>

              <Button
                onClick={() => handleDownload(selectedSession)}
                className="w-full mt-6 rounded-xl gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
