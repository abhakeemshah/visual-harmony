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
        "group relative flex flex-col items-center justify-center p-8 rounded-2xl",
        "hover:scale-[1.03] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-ring/50",
        "min-h-[280px] w-full",
        "transition-all duration-300 ease-out",
        variantStyles[variant],
        className
      )}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Icon with bounce animation */}
        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
          <Icon className="w-12 h-12 group-hover:animate-bounce-gentle" />
        </div>
        
        <h3 className="font-serif text-2xl font-medium">{title}</h3>
        
        <p className="text-sm opacity-90 max-w-[200px]">{description}</p>
        
        {/* Animated arrow indicator */}
        <div className="flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>Get Started</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
