import { QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRPlaceholderProps {
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-40 h-40",
  md: "w-56 h-56",
  lg: "w-72 h-72",
};

export function QRPlaceholder({ isActive = true, size = "md" }: QRPlaceholderProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* QR Container with inner pulse rings */}
      <div
        className={cn(
          "relative rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden",
          sizes[size],
          isActive
            ? "bg-card shadow-xl border-2 border-secondary"
            : "bg-muted opacity-60 border-2 border-muted-foreground/20"
        )}
      >
        {/* Pulse rings - INSIDE the box only */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div
              className="absolute w-24 h-24 rounded-full bg-secondary/20 animate-pulse-ring"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute w-24 h-24 rounded-full bg-secondary/15 animate-pulse-ring"
              style={{ animationDelay: "0.7s" }}
            />
            <div
              className="absolute w-24 h-24 rounded-full bg-secondary/10 animate-pulse-ring"
              style={{ animationDelay: "1.4s" }}
            />
          </div>
        )}

        {/* QR Icon and Text */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <QrCode
            className={cn(
              "transition-all duration-300",
              size === "lg" ? "w-24 h-24" : size === "md" ? "w-20 h-20" : "w-14 h-14",
              isActive ? "text-secondary" : "text-muted-foreground"
            )}
          />
          <span
            className={cn(
              "text-sm font-medium px-3 py-1 rounded-full",
              isActive 
                ? "text-secondary bg-secondary/10" 
                : "text-muted-foreground bg-muted"
            )}
          >
            {isActive ? "Scan to Mark" : "Session Ended"}
          </span>
        </div>
      </div>
    </div>
  );
}
