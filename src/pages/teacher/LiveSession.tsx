import { useState, useEffect, useCallback } from "react";
import { CheckCircle, Download, ArrowLeft, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { RollGrid } from "@/components/RollGrid";
import { SessionParams } from "./CreateSession";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LiveSessionProps {
  onNavigate: (page: string) => void;
  sessionParams: SessionParams | null;
}

export function LiveSession({ onNavigate, sessionParams }: LiveSessionProps) {
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [markedStudents, setMarkedStudents] = useState<number[]>([]);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [isLastMinute, setIsLastMinute] = useState(false);

  // Simulate random students marking attendance (polling simulation)
  useEffect(() => {
    if (!isSessionActive || !sessionParams) return;

    const interval = setInterval(() => {
      setMarkedStudents((prev) => {
        if (prev.length >= sessionParams.expectedStudents) {
          clearInterval(interval);
          return prev;
        }

        const unmarked = Array.from(
          { length: sessionParams.expectedStudents },
          (_, i) => i + 1
        ).filter((n) => !prev.includes(n));

        if (unmarked.length === 0) return prev;

        const randomStudent =
          unmarked[Math.floor(Math.random() * unmarked.length)];
        return [...prev, randomStudent];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSessionActive, sessionParams]);

  const handleSessionExpire = useCallback(() => {
    setIsSessionActive(false);
    setShowEndPopup(true);
  }, []);

  const handleEndSessionEarly = () => {
    setIsSessionActive(false);
    setShowEndPopup(true);
  };

  const handleTimeUpdate = useCallback((remainingSeconds: number) => {
    setIsLastMinute(remainingSeconds <= 60 && remainingSeconds > 0);
  }, []);

  const handleDownloadCSV = () => {
    if (!sessionParams) return;
    
    const csvContent = [
      "Roll Number,Status",
      ...Array.from({ length: sessionParams.expectedStudents }, (_, i) => {
        const roll = i + 1;
        const status = markedStudents.includes(roll) ? "Present" : "Absent";
        return `${roll},${status}`;
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${sessionParams.className || "session"}_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBackToDashboard = () => {
    setShowEndPopup(false);
    onNavigate("teacher-create-session");
  };

  if (!sessionParams) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-muted-foreground mb-4">No active session</p>
          <Button onClick={() => onNavigate("teacher-create-session")}>
            Create Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left: Info Pills - Professional colors */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium">
              {sessionParams.semester} Semester
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium">
              {sessionParams.year}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
              {sessionParams.className}
            </span>
            {sessionParams.group && (
              <span className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium">
                {sessionParams.group}
              </span>
            )}
            <span className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-xs font-medium">
              {sessionParams.sessionType}
            </span>
          </div>

          {/* Right: Status Badge */}
          <div
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isSessionActive
                ? "bg-success/10 text-success"
                : "bg-muted text-muted-foreground"
            }`}
            role="status"
            aria-live="polite"
          >
            {isSessionActive && (
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
            )}
            {isSessionActive ? "Session Live" : "Session Ended"}
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side (70%) - Roll Grid */}
            <div className="lg:w-[70%] animate-slide-up">
              <div className="bg-card rounded-3xl p-6 shadow-xl border border-border h-full">
                {/* Grid Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-xl">Attendance Grid</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Live attendance tracking
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      <span className="text-success">{markedStudents.length}</span>
                      <span className="text-muted-foreground"> / {sessionParams.expectedStudents}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">students present</p>
                  </div>
                </div>

                {/* Roll Grid */}
                <RollGrid
                  expectedStudents={sessionParams.expectedStudents}
                  markedStudents={markedStudents}
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
              </div>
            </div>

            {/* Right Side (30%) - QR & Timer */}
            <div className="lg:w-[30%] animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="bg-card rounded-3xl p-6 shadow-xl border border-border sticky top-20">
                {/* QR Section with all elements inside */}
                <div className="text-center space-y-4">
                  {/* Title moved up */}
                  <h3 className="font-serif text-lg">Scan to Mark Attendance</h3>
                  
                  {/* QR Box */}
                  <div className="relative mx-auto">
                    <QRPlaceholder isActive={isSessionActive} size="lg" />
                  </div>

                  {/* Timer section - no borders */}
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-1">Time Remaining</p>
                    <CountdownTimer
                      initialMinutes={sessionParams.timerDuration}
                      onExpire={handleSessionExpire}
                      onTimeUpdate={handleTimeUpdate}
                      isRunning={isSessionActive}
                      size="md"
                    />
                  </div>

                  {/* End Session Button */}
                  {isSessionActive && (
                    <div className="pt-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="w-full rounded-xl gap-2 transition-all duration-300 hover:scale-[1.02]"
                            aria-label="End attendance session early"
                          >
                            <StopCircle className="w-4 h-4" />
                            End Session Early
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl animate-scale-in">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-serif text-xl">End Session Early?</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              This will stop the attendance session immediately. Students will no longer be able to scan the QR code and mark their attendance.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleEndSessionEarly}
                              className="rounded-xl bg-destructive hover:bg-destructive/90"
                            >
                              End Session
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}

                  {!isSessionActive && (
                    <p className="text-sm text-muted-foreground">
                      QR code is no longer valid
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Session Popup */}
      <Dialog open={showEndPopup} onOpenChange={setShowEndPopup}>
        <DialogContent className="rounded-3xl sm:max-w-md animate-scale-in">
          <DialogHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4 animate-pop">
              <CheckCircle className="w-10 h-10 text-success" aria-hidden="true" />
            </div>
            <DialogTitle className="font-serif text-2xl">Session Complete!</DialogTitle>
            <DialogDescription className="text-center space-y-2">
              <p className="text-lg font-semibold mt-2">
                <span className="text-success">{markedStudents.length}</span>
                <span className="text-muted-foreground"> / {sessionParams.expectedStudents}</span>
                <span className="text-muted-foreground"> students marked present</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Attendance record has been saved successfully
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-3 sm:flex-col pt-4">
            <Button
              onClick={handleDownloadCSV}
              className="w-full rounded-xl gap-2 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download Attendance Record
            </Button>
            <Button
              onClick={handleBackToDashboard}
              variant="outline"
              className="w-full rounded-xl gap-2 transition-all duration-300 hover:scale-[1.02]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
