import { QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRPlaceholderProps {
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-44 h-44",
  md: "w-56 h-56",
  lg: "w-64 h-64",
};

export function QRPlaceholder({ isActive = true, size = "md" }: QRPlaceholderProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* QR Container */}
      <div
        className={cn(
          "relative rounded-2xl flex items-center justify-center transition-all duration-500",
          sizes[size],
          isActive
            ? "bg-gradient-to-br from-card to-muted/50 shadow-xl border-2 border-primary/30"
            : "bg-muted opacity-60 border-2 border-muted-foreground/20"
        )}
      >
        {/* Pulse rings - contained inside */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
            <div
              className="absolute w-20 h-20 rounded-full bg-primary/15 animate-pulse-ring"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute w-20 h-20 rounded-full bg-primary/10 animate-pulse-ring"
              style={{ animationDelay: "0.7s" }}
            />
            <div
              className="absolute w-20 h-20 rounded-full bg-primary/5 animate-pulse-ring"
              style={{ animationDelay: "1.4s" }}
            />
          </div>
        )}

        {/* QR Icon and Text */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <QrCode
            className={cn(
              "transition-all duration-500",
              size === "lg" ? "w-20 h-20" : size === "md" ? "w-16 h-16" : "w-12 h-12",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium px-3 py-1 rounded-full transition-all duration-300",
              isActive 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground bg-muted"
            )}
          >
            {isActive ? "Ready to Scan" : "Session Ended"}
          </span>
        </div>
      </div>
    </div>
  );
}
