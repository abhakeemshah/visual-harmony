import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateSessionProps {
  onNavigate: (page: string) => void;
  onStartSession: (params: SessionParams) => void;
}

export interface SessionParams {
  timerDuration: number;
  expectedStudents: number;
  className: string;
  group: string;
}

export function CreateSession({ onNavigate, onStartSession }: CreateSessionProps) {
  const [timerDuration, setTimerDuration] = useState(5);
  const [expectedStudents, setExpectedStudents] = useState(50);
  const [className, setClassName] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartSession({
      timerDuration,
      expectedStudents,
      className,
      group,
    });
    onNavigate("teacher-live-session");
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("teacher-auth")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="font-serif text-2xl font-medium">Create Session</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Configure your attendance session
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Timer Duration (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  max={60}
                  value={timerDuration}
                  onChange={(e) => setTimerDuration(Number(e.target.value))}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="students">Expected Students</Label>
                <Input
                  id="students"
                  type="number"
                  min={1}
                  max={500}
                  value={expectedStudents}
                  onChange={(e) => setExpectedStudents(Number(e.target.value))}
                  required
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="className">Class Name (optional)</Label>
              <Input
                id="className"
                type="text"
                placeholder="e.g., CS 101"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="group">Group (optional)</Label>
              <Input
                id="group"
                type="text"
                placeholder="e.g., Section A"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate("teacher-auth")}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Start Session
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
