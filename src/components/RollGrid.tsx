import { cn } from "@/lib/utils";

interface RollGridProps {
  expectedStudents: number;
  markedStudents: number[];
  onToggle?: (rollNumber: number) => void;
  interactive?: boolean;
}

export function RollGrid({
  expectedStudents,
  markedStudents,
  onToggle,
  interactive = false,
}: RollGridProps) {
  const rolls = Array.from({ length: expectedStudents }, (_, i) => i + 1);

  return (
    <div 
      className="grid gap-2 justify-center"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 56px))',
        maxWidth: '100%',
      }}
      role="grid"
      aria-label="Attendance roll grid"
    >
      {rolls.map((roll) => {
        const isMarked = markedStudents.includes(roll);
        return (
          <button
            key={roll}
            disabled={!interactive}
            onClick={() => interactive && onToggle?.(roll)}
            aria-label={`Roll number ${roll}, ${isMarked ? 'marked present' : 'not marked'}`}
            aria-pressed={isMarked}
            role="gridcell"
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200",
              interactive && "cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              !interactive && "cursor-default",
              isMarked
                ? "bg-success text-success-foreground shadow-lg animate-pop"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {roll}
          </button>
        );
      })}
    </div>
  );
}
