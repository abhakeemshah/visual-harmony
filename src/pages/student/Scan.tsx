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
    bgColor: string;
  }
> = {
  success: {
    icon: CheckCircle,
    title: "Attendance Marked!",
    message: "Your attendance has been recorded successfully.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  "error-expired": {
    icon: Clock,
    title: "QR Code Expired",
    message: "This QR code has expired. Please scan the current code.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  "error-marked": {
    icon: CheckCircle,
    title: "Already Marked",
    message: "Your attendance for this session has already been recorded.",
    color: "text-highlight",
    bgColor: "bg-highlight/10",
  },
  "error-ended": {
    icon: XCircle,
    title: "Session Ended",
    message: "This attendance session has ended. Contact your teacher.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  "error-limit": {
    icon: Ban,
    title: "Limit Exceeded",
    message: "Session attendance limit has been reached.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  "error-invalid": {
    icon: AlertTriangle,
    title: "Invalid QR Code",
    message: "The QR code is invalid or corrupted. Please try again.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  "error-connection": {
    icon: WifiOff,
    title: "Connection Error",
    message: "Unable to connect to the attendance server. Check your internet connection.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};

// Mock success response data
const mockSuccessData = {
  course: "CS 101 - Introduction to Programming",
  teacherName: "Prof. John Smith",
  markedAt: new Date().toISOString(),
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
      "error-ended",
      "error-limit",
      "error-invalid",
      "error-connection",
    ];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    setScanState(result);
  };

  const resetScan = () => {
    setScanState("scanning");
  };

  const goBack = () => {
    onNavigate("student-entry");
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
            onClick={goBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label="Go back to roll number entry"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </button>

          {/* Roll Number Badge */}
          <div className="text-center mb-6">
            <span 
              className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
              aria-label={`Your roll number is ${rollNumber}`}
            >
              Roll #{rollNumber}
            </span>
          </div>

          {/* Scanning State */}
          {scanState === "scanning" && (
            <div className="text-center">
              <div 
                className="w-64 h-64 mx-auto rounded-3xl border-4 border-dashed border-secondary flex items-center justify-center bg-muted/50 mb-6"
                role="img"
                aria-label="Camera viewfinder placeholder"
              >
                <div className="text-center">
                  <Camera className="w-16 h-16 text-secondary mx-auto mb-2" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">Camera Preview</p>
                  <p className="text-xs text-muted-foreground mt-1">Point at QR code</p>
                </div>
              </div>
              <Button
                onClick={simulateScan}
                className="rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                aria-label="Simulate scanning a QR code"
              >
                Simulate Scan
              </Button>
            </div>
          )}

          {/* Loading State */}
          {scanState === "loading" && (
            <div className="text-center py-16" role="status" aria-live="polite">
              <Loader2 className="w-16 h-16 text-secondary mx-auto animate-spin mb-4" aria-hidden="true" />
              <p className="text-muted-foreground">Processing QR code...</p>
            </div>
          )}

          {/* Result States */}
          {scanState !== "scanning" && scanState !== "loading" && (
            <div className="text-center py-6" role="alert" aria-live="polite">
              {(() => {
                const config = stateConfig[scanState];
                const Icon = config.icon;
                return (
                  <>
                    <div className={`w-24 h-24 rounded-full ${config.bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-12 h-12 ${config.color}`} aria-hidden="true" />
                    </div>
                    <h2 className="font-serif text-2xl mb-2">{config.title}</h2>
                    <p className="text-muted-foreground mb-6">{config.message}</p>

                    {/* Success Details */}
                    {scanState === "success" && (
                      <div className="bg-success/10 rounded-xl p-4 mb-6 text-left space-y-2">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Course:</span>{" "}
                          <span className="font-medium">{mockSuccessData.course}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Teacher:</span>{" "}
                          <span className="font-medium">{mockSuccessData.teacherName}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Marked At:</span>{" "}
                          <span className="font-medium">
                            {new Date(mockSuccessData.markedAt).toLocaleTimeString()}
                          </span>
                        </p>
                      </div>
                    )}

                    {/* Action Buttons - Always show both */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={goBack}
                        className="flex-1 rounded-xl"
                        aria-label="Go back to roll number entry"
                      >
                        Go Back
                      </Button>
                      <Button
                        onClick={resetScan}
                        className="flex-1 rounded-xl bg-secondary hover:bg-secondary/90"
                        aria-label="Try scanning again"
                      >
                        Try Again
                      </Button>
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
