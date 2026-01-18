import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "primary" | "secondary" | "accent" | "highlight";
  className?: string;
}

const variantStyles = {
  primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
  secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
  accent: "bg-accent hover:bg-accent/90 text-accent-foreground",
  highlight: "bg-highlight hover:bg-highlight/90 text-highlight-foreground",
};

export function RoleCard({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "primary",
  className,
}: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center p-8 rounded-2xl transition-all duration-300",
        "hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-ring/50",
        "min-h-[280px] w-full",
        variantStyles[variant],
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
          <Icon className="w-12 h-12" />
        </div>
        
        <h3 className="font-serif text-2xl font-medium">{title}</h3>
        
        <p className="text-sm opacity-90 max-w-[200px]">{description}</p>
      </div>
    </button>
  );
}
