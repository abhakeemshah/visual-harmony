import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  WifiOff,
  Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentScanProps {
  onNavigate: (page: string) => void;
  rollNumber: number | null;
}

type ScanState =
  | "scanning"
  | "loading"
  | "success"
  | "error-expired"
  | "error-marked"
  | "error-ended"
  | "error-limit"
  | "error-invalid"
  | "error-connection";

const stateConfig: Record<
  Exclude<ScanState, "scanning" | "loading">,
  {
    icon: typeof CheckCircle;
    title: string;
    message: string;
    color: string;
  }
> = {
  success: {
    icon: CheckCircle,
    title: "Attendance Marked!",
    message: "Your attendance has been recorded successfully.",
    color: "text-success",
  },
  "error-expired": {
    icon: Clock,
    title: "QR Code Expired",
    message: "This QR code has expired. Please scan the current code.",
    color: "text-destructive",
  },
  "error-marked": {
    icon: CheckCircle,
    title: "Already Marked",
    message: "Your attendance for this session has already been recorded.",
    color: "text-highlight",
  },
  "error-ended": {
    icon: XCircle,
    title: "Session Ended",
    message: "This attendance session has ended. Contact your teacher.",
    color: "text-destructive",
  },
  "error-limit": {
    icon: Ban,
    title: "Limit Exceeded",
    message: "Session attendance limit reached.",
    color: "text-destructive",
  },
  "error-invalid": {
    icon: AlertTriangle,
    title: "Invalid QR",
    message: "The QR code is invalid. Please try again.",
    color: "text-destructive",
  },
  "error-connection": {
    icon: WifiOff,
    title: "Connection Error",
    message: "Unable to connect to the attendance server.",
    color: "text-destructive",
  },
};

export function StudentScan({ onNavigate, rollNumber }: StudentScanProps) {
  const [scanState, setScanState] = useState<ScanState>("scanning");

  const simulateScan = async () => {
    setScanState("loading");
    await new Promise((r) => setTimeout(r, 1500));

    // Randomly pick success or an error for demo
    const outcomes: ScanState[] = [
      "success",
      "success",
      "success",
      "error-expired",
      "error-marked",
    ];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    setScanState(result);
  };

  const resetScan = () => {
    setScanState("scanning");
  };

  if (!rollNumber) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No roll number provided</p>
          <Button onClick={() => onNavigate("student-entry")}>
            Enter Roll Number
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("student-entry")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Roll Number Badge */}
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
              Roll #{rollNumber}
            </span>
          </div>

          {/* Scanning State */}
          {scanState === "scanning" && (
            <div className="text-center">
              <div className="w-64 h-64 mx-auto rounded-3xl border-4 border-dashed border-secondary flex items-center justify-center bg-muted/50 mb-6">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Camera Preview</p>
                </div>
              </div>
              <Button
                onClick={simulateScan}
                className="rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Simulate Scan
              </Button>
            </div>
          )}

          {/* Loading State */}
          {scanState === "loading" && (
            <div className="text-center py-16">
              <Loader2 className="w-16 h-16 text-secondary mx-auto animate-spin mb-4" />
              <p className="text-muted-foreground">Processing QR code...</p>
            </div>
          )}

          {/* Result States */}
          {scanState !== "scanning" && scanState !== "loading" && (
            <div className="text-center py-8">
              {(() => {
                const config = stateConfig[scanState];
                const Icon = config.icon;
                return (
                  <>
                    <Icon className={`w-20 h-20 mx-auto mb-4 ${config.color}`} />
                    <h2 className="font-serif text-2xl mb-2">{config.title}</h2>
                    <p className="text-muted-foreground mb-8">{config.message}</p>

                    {scanState === "success" && (
                      <div className="bg-success/10 rounded-xl p-4 mb-6 text-left">
                        <p className="text-sm">
                          <strong>Course:</strong> CS 101 - Introduction
                        </p>
                        <p className="text-sm">
                          <strong>Teacher:</strong> Prof. Smith
                        </p>
                        <p className="text-sm">
                          <strong>Time:</strong> {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => onNavigate("landing")}
                        className="flex-1 rounded-xl"
                      >
                        Go Home
                      </Button>
                      {scanState !== "success" && (
                        <Button
                          onClick={resetScan}
                          className="flex-1 rounded-xl bg-secondary hover:bg-secondary/90"
                        >
                          Try Again
                        </Button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
