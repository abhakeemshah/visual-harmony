import { QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRPlaceholderProps {
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
};

export function QRPlaceholder({ isActive = true, size = "md" }: QRPlaceholderProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse rings - only when active */}
      {isActive && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "rounded-2xl bg-secondary/30 animate-pulse-ring",
                sizes[size]
              )}
              style={{ animationDelay: "0s" }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "rounded-2xl bg-secondary/20 animate-pulse-ring",
                sizes[size]
              )}
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "rounded-2xl bg-secondary/10 animate-pulse-ring",
                sizes[size]
              )}
              style={{ animationDelay: "1s" }}
            />
          </div>
        </>
      )}

      {/* QR Placeholder */}
      <div
        className={cn(
          "relative rounded-2xl flex items-center justify-center transition-all",
          sizes[size],
          isActive
            ? "bg-card shadow-xl border-2 border-secondary"
            : "bg-muted opacity-60 border-2 border-muted-foreground/20"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <QrCode
            className={cn(
              "w-16 h-16 md:w-24 md:h-24",
              isActive ? "text-secondary" : "text-muted-foreground"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium",
              isActive ? "text-secondary" : "text-muted-foreground"
            )}
          >
            {isActive ? "Scan to Mark" : "Session Ended"}
          </span>
        </div>
      </div>
    </div>
  );
}
