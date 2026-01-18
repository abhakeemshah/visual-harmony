import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Users, Clock, BookOpen, UsersRound } from "lucide-react";
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

interface LiveSessionProps {
  onNavigate: (page: string) => void;
  sessionParams: SessionParams | null;
}

export function LiveSession({ onNavigate, sessionParams }: LiveSessionProps) {
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [markedStudents, setMarkedStudents] = useState<number[]>([]);

  // Simulate random students marking attendance
  useEffect(() => {
    if (!isSessionActive || !sessionParams) return;

    const interval = setInterval(() => {
      setMarkedStudents((prev) => {
        if (prev.length >= sessionParams.expectedStudents) {
          clearInterval(interval);
          return prev;
        }

        // Random student marking
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
  }, []);

  const handleEndSession = () => {
    setIsSessionActive(false);
    onNavigate("teacher-create-session");
  };

  if (!sessionParams) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No active session</p>
          <Button onClick={() => onNavigate("teacher-create-session")}>
            Create Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate("teacher-create-session")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label="Go back to create session"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="rounded-xl"
                aria-label="End attendance session"
              >
                End Session
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>End Session Early?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will stop the attendance session immediately. Students will no longer be able to mark their attendance.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleEndSession}
                  className="rounded-xl bg-destructive hover:bg-destructive/90"
                >
                  End Session
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Session Info Header Card */}
        <div className="bg-card rounded-3xl p-6 shadow-lg border border-border mb-6">
          {/* Session Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Class Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Class</p>
                <p className="font-semibold truncate">
                  {sessionParams.className || "Untitled"}
                </p>
              </div>
            </div>

            {/* Group */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <UsersRound className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Group</p>
                <p className="font-semibold truncate">
                  {sessionParams.group || "—"}
                </p>
              </div>
            </div>

            {/* Timer Duration */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-secondary" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold">{sessionParams.timerDuration} min</p>
              </div>
            </div>

            {/* Present Count */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-success" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Present</p>
                <p className="font-semibold">
                  <span className="text-success">{markedStudents.length}</span>
                  <span className="text-muted-foreground"> / {sessionParams.expectedStudents}</span>
                </p>
              </div>
            </div>
          </div>

          {/* QR and Timer Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-6">
            {/* QR Placeholder - Prominent */}
            <div className="flex-shrink-0">
              <QRPlaceholder isActive={isSessionActive} size="lg" />
            </div>

            {/* Countdown Timer */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Time Remaining</p>
              <CountdownTimer
                initialMinutes={sessionParams.timerDuration}
                onExpire={handleSessionExpire}
                isRunning={isSessionActive}
              />
              {!isSessionActive && (
                <p className="text-sm text-muted-foreground mt-2">
                  QR code is no longer valid
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Attendance Roll Grid */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl">Attendance Grid</h2>
            <span 
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                isSessionActive 
                  ? 'bg-success/10 text-success' 
                  : 'bg-muted text-muted-foreground'
              }`}
              aria-live="polite"
            >
              {isSessionActive ? 'Session Active' : 'Session Ended'}
            </span>
          </div>
          <RollGrid
            expectedStudents={sessionParams.expectedStudents}
            markedStudents={markedStudents}
            interactive={false}
          />
        </div>
      </div>
    </div>
  );
}
