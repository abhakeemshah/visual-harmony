import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialMinutes: number;
  onExpire?: () => void;
  onTimeUpdate?: (remainingSeconds: number) => void;
  isRunning?: boolean;
  size?: "sm" | "md" | "lg";
}

export function CountdownTimer({
  initialMinutes,
  onExpire,
  onTimeUpdate,
  isRunning = true,
  size = "md",
}: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const isLastMinute = secondsLeft <= 60 && secondsLeft > 0;
  const isExpired = secondsLeft <= 0;

  useEffect(() => {
    if (!isRunning || isExpired) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onExpire?.();
          return 0;
        }
        const newValue = prev - 1;
        onTimeUpdate?.(newValue);
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isExpired, onExpire, onTimeUpdate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl",
  };

  if (isExpired) {
    return (
      <div className="text-center">
        <p className={cn("font-bold text-muted-foreground font-mono", sizeClasses[size])}>
          00:00
        </p>
        <p className="text-sm text-muted-foreground mt-1 animate-fade-in">
          Session ended
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p
        className={cn(
          "font-bold font-mono tabular-nums transition-colors duration-300",
          sizeClasses[size],
          isLastMinute ? "text-destructive animate-pulse" : "text-foreground"
        )}
        role="timer"
        aria-live="polite"
      >
        {formatTime(minutes)}:{formatTime(seconds)}
      </p>
      {isLastMinute && (
        <p className="text-sm text-destructive mt-1 animate-pulse">
          Session ending soon!
        </p>
      )}
    </div>
  );
}
