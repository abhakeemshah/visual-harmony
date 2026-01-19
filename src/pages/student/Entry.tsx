import { useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StudentEntryProps {
  onNavigate: (page: string) => void;
  onSetRollNumber: (roll: number) => void;
}

// Max roll number from admin settings (default 200)
const MAX_ROLL_NUMBER = 200;

export function StudentEntry({ onNavigate, onSetRollNumber }: StudentEntryProps) {
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState("");

  const validateRollNumber = (value: string): string | null => {
    // Must be numeric only
    if (!/^\d+$/.test(value)) {
      return "Roll number must be numeric";
    }
    
    const roll = parseInt(value, 10);
    
    // Must be >= 1
    if (roll < 1) {
      return "Roll number must be at least 1";
    }
    
    // Must be <= maxRollNumber
    if (roll > MAX_ROLL_NUMBER) {
      return `Roll number must not exceed ${MAX_ROLL_NUMBER}`;
    }
    
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow up to 3 digits
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setRollNumber(value);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rollNumber) {
      setError("Roll number is required");
      return;
    }
    
    const validationError = validateRollNumber(rollNumber);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    const roll = parseInt(rollNumber, 10);
    onSetRollNumber(roll);
    onNavigate("student-scan");
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label="Return to role selection"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-accent-foreground" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-2xl font-medium">Student Entry</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Enter your roll number to proceed
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={3}
                placeholder="e.g., 42"
                value={rollNumber}
                onChange={handleInputChange}
                required
                className="rounded-xl text-center text-2xl font-semibold h-14"
                aria-required="true"
                aria-invalid={!!error}
                aria-describedby={error ? "roll-error" : "roll-hint"}
              />
              {error && (
                <p id="roll-error" className="text-sm text-destructive text-center" role="alert">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground h-12"
              aria-label="Proceed to scan QR code"
            >
              Scan QR Code
            </Button>
          </form>

          {/* Footer Hint */}
          <p id="roll-hint" className="text-xs text-muted-foreground text-center mt-4">
            Enter your roll number (1-{MAX_ROLL_NUMBER}) and scan the QR code displayed by your teacher
          </p>
        </div>
      </div>
    </div>
  );
}
