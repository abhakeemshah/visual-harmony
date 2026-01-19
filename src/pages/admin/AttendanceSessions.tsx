import { useState } from "react";
import { Search, Filter, Download, Eye, AlertTriangle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminLayout } from "@/components/AdminLayout";
import { RollGrid } from "@/components/RollGrid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AttendanceSessionsProps { onNavigate: (page: string) => void; }

const mockSessions = [
  { id: "1", date: "2024-01-15", teacherName: "Prof. John Smith", subject: "CS 101", semester: "1st", time: "09:30", duration: 5, expected: 50, marked: [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45] },
  { id: "2", date: "2024-01-15", teacherName: "Dr. Sarah Johnson", subject: "Math 201", semester: "2nd", time: "11:30", duration: 5, expected: 40, marked: [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38] },
  { id: "3", date: "2024-01-14", teacherName: "Prof. Michael Brown", subject: "Physics 301", semester: "1st", time: "14:30", duration: 10, expected: 30, marked: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25] },
];

export function AttendanceSessions({ onNavigate }: AttendanceSessionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSession, setSelectedSession] = useState<typeof mockSessions[0] | null>(null);
  const [sessionMarked, setSessionMarked] = useState<Record<string, number[]>>({});
  const [toggleConfirm, setToggleConfirm] = useState<{ roll: number; isMarked: boolean } | null>(null);

  const getMarkedStudents = (sessionId: string) => sessionMarked[sessionId] || mockSessions.find((s) => s.id === sessionId)?.marked || [];

  const handleToggle = (roll: number) => {
    if (!selectedSession) return;
    const current = getMarkedStudents(selectedSession.id);
    const isMarked = current.includes(roll);
    setToggleConfirm({ roll, isMarked });
  };

  const confirmToggle = () => {
    if (!selectedSession || !toggleConfirm) return;
    const current = getMarkedStudents(selectedSession.id);
    const newMarked = toggleConfirm.isMarked ? current.filter((r) => r !== toggleConfirm.roll) : [...current, toggleConfirm.roll];
    setSessionMarked((prev) => ({ ...prev, [selectedSession.id]: newMarked }));
    setToggleConfirm(null);
  };

  const groupedSessions = mockSessions.reduce((acc, session) => {
    if (!acc[session.date]) acc[session.date] = [];
    acc[session.date].push(session);
    return acc;
  }, {} as Record<string, typeof mockSessions>);

  return (
    <AdminLayout currentPage="admin-sessions" onNavigate={onNavigate}>
      <h1 className="font-serif text-3xl font-medium mb-6">Attendance Sessions</h1>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search sessions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 rounded-xl" />
        </div>
        <Button variant="outline" className="rounded-xl gap-2"><Filter className="w-4 h-4" /> Filter</Button>
      </div>

      {Object.entries(groupedSessions).map(([date, sessions]) => (
        <div key={date} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold">{date}</h3>
            <span className="text-sm text-muted-foreground">({sessions.length} sessions)</span>
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Teacher</TableHead><TableHead>Subject</TableHead><TableHead>Time</TableHead><TableHead>Duration</TableHead><TableHead>Attendance</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.teacherName}</TableCell>
                    <TableCell>{session.subject} <span className="text-xs text-muted-foreground">• {session.semester}</span></TableCell>
                    <TableCell>{session.time}</TableCell>
                    <TableCell>{session.duration} min</TableCell>
                    <TableCell><span className="text-success font-semibold">{getMarkedStudents(session.id).length}</span> / {session.expected}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedSession(session)} className="rounded-xl"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="rounded-xl"><Download className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}

      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif">{selectedSession?.subject}</DialogTitle>
            <p className="text-sm text-muted-foreground">{selectedSession?.teacherName} • {selectedSession?.date} {selectedSession?.time}</p>
          </DialogHeader>
          {selectedSession && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-muted rounded-xl p-3 text-center"><p className="text-xs text-muted-foreground">Duration</p><p className="font-semibold">{selectedSession.duration} min</p></div>
                <div className="bg-success/10 rounded-xl p-3 text-center"><p className="text-xs text-muted-foreground">Present</p><p className="font-semibold text-success">{getMarkedStudents(selectedSession.id).length}</p></div>
                <div className="bg-muted rounded-xl p-3 text-center"><p className="text-xs text-muted-foreground">Expected</p><p className="font-semibold">{selectedSession.expected}</p></div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Click any roll number to toggle</p>
              <RollGrid expectedStudents={selectedSession.expected} markedStudents={getMarkedStudents(selectedSession.id)} interactive onToggle={handleToggle} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!toggleConfirm} onOpenChange={() => setToggleConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-highlight" /> Confirm Change</AlertDialogTitle>
            <AlertDialogDescription>Mark roll {toggleConfirm?.roll} as {toggleConfirm?.isMarked ? "absent" : "present"}?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle} className="rounded-xl">Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
