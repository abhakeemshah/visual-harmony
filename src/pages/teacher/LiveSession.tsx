import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { RollGrid } from "@/components/RollGrid";
import { SessionParams } from "./CreateSession";

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
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate("teacher-create-session")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <Button
            variant="destructive"
            onClick={handleEndSession}
            className="rounded-xl"
          >
            End Session
          </Button>
        </div>

        {/* Session Info */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-medium">
                {sessionParams.className || "Attendance Session"}
              </h1>
              {sessionParams.group && (
                <p className="text-muted-foreground">{sessionParams.group}</p>
              )}
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary">
              <Users className="w-5 h-5" />
              <span className="font-semibold">
                {markedStudents.length} / {sessionParams.expectedStudents}
              </span>
              <span className="text-sm">present</span>
            </div>
          </div>

          {/* QR and Timer */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8">
            <QRPlaceholder isActive={isSessionActive} size="lg" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Time Remaining</p>
              <CountdownTimer
                initialMinutes={sessionParams.timerDuration}
                onExpire={handleSessionExpire}
                isRunning={isSessionActive}
              />
            </div>
          </div>
        </div>

        {/* Roll Grid */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border">
          <h2 className="font-serif text-xl mb-6">Attendance Grid</h2>
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
