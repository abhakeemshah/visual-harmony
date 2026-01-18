import { useState } from "react";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StudentEntryProps {
  onNavigate: (page: string) => void;
  onSetRollNumber: (roll: number) => void;
}

export function StudentEntry({ onNavigate, onSetRollNumber }: StudentEntryProps) {
  const [rollNumber, setRollNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roll = parseInt(rollNumber, 10);
    if (roll > 0) {
      onSetRollNumber(roll);
      onNavigate("student-scan");
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-accent-foreground" />
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
                type="number"
                min={1}
                placeholder="e.g., 42"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                className="rounded-xl text-center text-2xl font-semibold h-14"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground h-12"
            >
              Proceed to Scan
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
