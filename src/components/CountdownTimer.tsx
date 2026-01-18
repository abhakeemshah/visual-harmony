import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialMinutes: number;
  onExpire?: () => void;
  isRunning?: boolean;
}

export function CountdownTimer({
  initialMinutes,
  onExpire,
  isRunning = true,
}: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const isWarning = secondsLeft <= 30;
  const isExpired = secondsLeft <= 0;

  useEffect(() => {
    if (!isRunning || isExpired) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isExpired, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-2xl md:text-4xl font-bold text-destructive font-mono">
          Session Ended
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p
        className={cn(
          "text-4xl md:text-6xl font-bold font-mono transition-colors",
          isWarning ? "text-destructive" : "text-foreground"
        )}
      >
        {formatTime(minutes)}:{formatTime(seconds)}
      </p>
      {isWarning && (
        <p className="text-sm text-destructive mt-2 animate-pulse">
          Session ending soon!
        </p>
      )}
    </div>
  );
}
