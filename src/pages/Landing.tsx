import { Users, GraduationCap, Sparkles } from "lucide-react";
import { RoleCard } from "@/components/ui/role-card";

interface LandingProps {
  onNavigate: (page: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Smart Attendance System</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-tight">
            An Easier, More Powerful{" "}
            <span className="relative inline-block">
              Platform
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-primary"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            To Track <span className="text-primary">Attendance</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Build your classroom network, track attendance effortlessly, and open up
            on the learning platform where you can be your whole self. No more paper
            sheets or manual tracking.
          </p>
        </div>
      </section>

      {/* Role Selection */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <RoleCard
              title="Teacher"
              description="Create QR sessions and monitor student attendance in real-time"
              icon={Users}
              onClick={() => onNavigate("teacher-auth")}
              variant="secondary"
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <RoleCard
              title="Student"
              description="Scan QR codes to mark your attendance quickly and easily"
              icon={GraduationCap}
              onClick={() => onNavigate("student-entry")}
              variant="accent"
            />
          </div>
        </div>
      </section>

      {/* Visual Section with Colored Frames */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { bg: "bg-accent", rotate: "-rotate-6", delay: "0.1s" },
            { bg: "bg-highlight", rotate: "rotate-3", delay: "0.2s" },
            { bg: "bg-primary", rotate: "-rotate-3", delay: "0.3s" },
            { bg: "bg-secondary", rotate: "rotate-6", delay: "0.4s" },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.bg} ${item.rotate} w-20 h-24 md:w-28 md:h-32 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ease-out hover:scale-110 hover:rotate-0 animate-slide-up`}
              style={{ animationDelay: item.delay }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-sm" />
            </div>
          ))}
        </div>
      </section>

      {/* Growth Mindset Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 rounded-t-[3rem] mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="font-serif text-2xl md:text-4xl leading-relaxed">
              Within Any <span className="inline-block">✦</span> Career Field, The
              Belief That You Can Improve Will Motivate You To{" "}
              <span className="underline decoration-wavy decoration-highlight underline-offset-8">
                Persevere
              </span>{" "}
              <span className="inline-block">✦</span> Despite Obstacles. Here Are
              Other Career Benefits Of A{" "}
              <span className="px-3 py-1 border border-primary-foreground/30 rounded-full text-sm align-middle">
                Growth Mindset ✦
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
