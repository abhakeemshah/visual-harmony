import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CreateSessionProps {
  onNavigate: (page: string) => void;
  onStartSession: (params: SessionParams) => void;
}

export interface SessionParams {
  timerDuration: number;
  expectedStudents: number;
  className: string;
  group: string;
  semester: "1st" | "2nd";
  year: number;
  shift: "Morning" | "Evening";
  sessionType: "Theory" | "Practical";
  sessionDate: string;
  startTime: string;
  endTime: string;
  notes: string;
}

// Batch limits by year
const BATCH_LIMITS: Record<number, number> = {
  2023: 200,
  2024: 180,
  2025: 170,
  2026: 150,
};

const YEARS = [2023, 2024, 2025, 2026];

// Time slots from 08:30 to 17:30 in 1-hour intervals
const TIME_SLOTS = [
  "08:30", "09:30", "10:30", "11:30", "12:30", 
  "13:30", "14:30", "15:30", "16:30", "17:30"
];

const STEPS = ["Basics", "Schedule", "Settings"];

export function CreateSession({ onNavigate, onStartSession }: CreateSessionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 0 - Basics
  const [semester, setSemester] = useState<"1st" | "2nd">("1st");
  const [year, setYear] = useState<number>(2024);
  const [shift, setShift] = useState<"Morning" | "Evening">("Morning");
  const [className, setClassName] = useState("");
  const [group, setGroup] = useState("");
  
  // Step 1 - Schedule
  const [sessionType, setSessionType] = useState<"Theory" | "Practical">("Theory");
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("09:30");
  const [endTime, setEndTime] = useState("10:30");
  
  // Step 2 - Settings
  const [expectedStudents, setExpectedStudents] = useState(50);
  const [timerDuration, setTimerDuration] = useState(5);
  const [notes, setNotes] = useState("");

  // Get max students for selected year
  const maxStudents = BATCH_LIMITS[year] || 200;

  // Auto-adjust expected students when year changes
  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    const newMax = BATCH_LIMITS[newYear] || 200;
    if (expectedStudents > newMax) {
      setExpectedStudents(newMax);
    }
  };

  // Get valid end times (after start time)
  const getValidEndTimes = () => {
    const startIndex = TIME_SLOTS.indexOf(startTime);
    return TIME_SLOTS.filter((_, index) => index > startIndex);
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return className.trim() !== "";
    }
    if (currentStep === 1) {
      return startTime && endTime && sessionDate;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate("teacher-auth");
    }
  };

  const handleSubmit = () => {
    onStartSession({
      timerDuration,
      expectedStudents,
      className,
      group,
      semester,
      year,
      shift,
      sessionType,
      sessionDate,
      startTime,
      endTime,
      notes,
    });
    onNavigate("teacher-live-session");
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center pb-8">
      <div className="w-full max-w-2xl px-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6 focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
          aria-label={currentStep === 0 ? "Return to login" : "Go to previous step"}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {currentStep === 0 ? "Back" : "Previous"}
        </button>

        {/* Page Title - Larger */}
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-8 text-center animate-slide-up">
          Create Session
        </h1>

        {/* Stepper - Smaller and Centered */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }} role="navigation" aria-label="Form steps">
          {STEPS.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    index < currentStep
                      ? "bg-success text-success-foreground scale-100"
                      : index === currentStep
                      ? "bg-secondary text-secondary-foreground scale-110"
                      : "bg-muted text-muted-foreground scale-100"
                  )}
                  aria-current={index === currentStep ? "step" : undefined}
                >
                  {index < currentStep ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-2 transition-colors",
                  index === currentStep ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {step}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-8 md:w-12 h-0.5 mx-2",
                    index < currentStep ? "bg-success" : "bg-muted"
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card - Larger */}
        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border animate-scale-in">
          {/* Step 0 - Basics */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              {/* Semester Toggle */}
              <div className="space-y-3">
                <Label className="text-base">Semester</Label>
                <div className="flex gap-3">
                  {(["1st", "2nd"] as const).map((sem) => (
                    <Button
                      key={sem}
                      type="button"
                      variant={semester === sem ? "default" : "outline"}
                      onClick={() => setSemester(sem)}
                      className={cn(
                        "flex-1 rounded-xl h-12 text-base transition-all duration-200 hover:scale-[1.02]",
                        semester === sem && "bg-secondary text-secondary-foreground"
                      )}
                      aria-pressed={semester === sem}
                    >
                      {sem} Semester
                    </Button>
                  ))}
                </div>
              </div>

              {/* Year Dropdown */}
              <div className="space-y-3">
                <Label htmlFor="year" className="text-base">Year</Label>
                <Select
                  value={year.toString()}
                  onValueChange={(v) => handleYearChange(Number(v))}
                >
                  <SelectTrigger id="year" className="rounded-xl h-12 text-base">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Shift Toggle */}
              <div className="space-y-3">
                <Label className="text-base">Shift</Label>
                <div className="flex gap-3">
                  {(["Morning", "Evening"] as const).map((s) => (
                    <Button
                      key={s}
                      type="button"
                      variant={shift === s ? "default" : "outline"}
                      onClick={() => setShift(s)}
                      className={cn(
                        "flex-1 rounded-xl h-12 text-base transition-all duration-200 hover:scale-[1.02]",
                        shift === s && "bg-secondary text-secondary-foreground"
                      )}
                      aria-pressed={shift === s}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Class Name */}
              <div className="space-y-3">
                <Label htmlFor="className" className="text-base">Class Name *</Label>
                <Input
                  id="className"
                  type="text"
                  placeholder="e.g., CS 101"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  className="rounded-xl h-12 text-base transition-all duration-200 focus:scale-[1.01]"
                />
              </div>

              {/* Group */}
              <div className="space-y-3">
                <Label htmlFor="group" className="text-base">Group (optional)</Label>
                <Input
                  id="group"
                  type="text"
                  placeholder="e.g., Section A"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="rounded-xl h-12 text-base transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
            </div>
          )}

          {/* Step 1 - Schedule */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Session Type Toggle */}
              <div className="space-y-3">
                <Label className="text-base">Session Type</Label>
                <div className="flex gap-3">
                  {(["Theory", "Practical"] as const).map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={sessionType === type ? "default" : "outline"}
                      onClick={() => setSessionType(type)}
                      className={cn(
                        "flex-1 rounded-xl h-12 text-base transition-all duration-200 hover:scale-[1.02]",
                        sessionType === type && "bg-secondary text-secondary-foreground"
                      )}
                      aria-pressed={sessionType === type}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Session Date */}
              <div className="space-y-3">
                <Label htmlFor="sessionDate" className="text-base">Session Date</Label>
                <Input
                  id="sessionDate"
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="rounded-xl h-12 text-base"
                />
              </div>

              {/* Start Time */}
              <div className="space-y-3">
                <Label htmlFor="startTime" className="text-base">Start Time</Label>
                <Select
                  value={startTime}
                  onValueChange={(v) => {
                    setStartTime(v);
                    const newValidEndTimes = TIME_SLOTS.filter(
                      (_, index) => index > TIME_SLOTS.indexOf(v)
                    );
                    if (!newValidEndTimes.includes(endTime)) {
                      setEndTime(newValidEndTimes[0] || "");
                    }
                  }}
                >
                  <SelectTrigger id="startTime" className="rounded-xl h-12 text-base">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.slice(0, -1).map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* End Time */}
              <div className="space-y-3">
                <Label htmlFor="endTime" className="text-base">End Time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger id="endTime" className="rounded-xl h-12 text-base">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {getValidEndTimes().map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2 - Settings */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              {/* Expected Students Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="expectedStudents" className="text-base">Expected Students</Label>
                  <span className="text-lg font-bold bg-secondary/10 text-secondary px-4 py-2 rounded-xl">
                    {expectedStudents}
                  </span>
                </div>
                <Slider
                  id="expectedStudents"
                  min={1}
                  max={maxStudents}
                  step={1}
                  value={[expectedStudents]}
                  onValueChange={(v) => setExpectedStudents(v[0])}
                  className="py-2"
                  aria-label="Expected number of students"
                />
                <p className="text-sm text-muted-foreground">
                  Max students for {year} batch: {maxStudents}
                </p>
              </div>

              {/* Timer Duration Selector */}
              <div className="space-y-3">
                <Label className="text-base">Timer Duration</Label>
                <div className="flex gap-3">
                  {[3, 5].map((duration) => (
                    <Button
                      key={duration}
                      type="button"
                      variant={timerDuration === duration ? "default" : "outline"}
                      onClick={() => setTimerDuration(duration)}
                      className={cn(
                        "flex-1 rounded-xl h-12 text-base transition-all duration-200 hover:scale-[1.02]",
                        timerDuration === duration && "bg-secondary text-secondary-foreground"
                      )}
                      aria-pressed={timerDuration === duration}
                    >
                      {duration} min
                    </Button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-base">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes for this session..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="rounded-xl resize-none text-base transition-all duration-200 focus:scale-[1.01]"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-8 mt-8 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1 rounded-xl h-12 text-base transition-all duration-200 hover:scale-[1.02]"
            >
              {currentStep === 0 ? "Cancel" : "Back"}
            </Button>
            {currentStep < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 rounded-xl h-12 text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 hover:scale-[1.02]"
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex-1 rounded-xl h-12 text-base bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 hover:scale-[1.02]"
              >
                Start Session
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
