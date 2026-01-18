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
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
      {rolls.map((roll) => {
        const isMarked = markedStudents.includes(roll);
        return (
          <button
            key={roll}
            disabled={!interactive}
            onClick={() => interactive && onToggle?.(roll)}
            className={cn(
              "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all",
              interactive && "cursor-pointer hover:scale-105",
              !interactive && "cursor-default",
              isMarked
                ? "bg-success text-success-foreground animate-pop shadow-lg"
                : "bg-muted text-muted-foreground"
            )}
          >
            {roll}
          </button>
        );
      })}
    </div>
  );
}
