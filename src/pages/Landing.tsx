import { Users, GraduationCap, Sparkles, BookOpen, Clock, Shield, Zap } from "lucide-react";
import { RoleCard } from "@/components/ui/role-card";

interface LandingProps {
  onNavigate: (page: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  const features = [
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Instant QR-based attendance with live updates",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Data encryption and backup systems",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: BookOpen,
      title: "Easy Reports",
      description: "Download attendance records anytime",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Zap,
      title: "Fast Setup",
      description: "Start a session in under 30 seconds",
      color: "bg-success/10 text-success",
    },
  ];

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
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
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build your classroom network, track attendance effortlessly, and open up
            on the learning platform where you can be your whole self. No more paper
            sheets or manual tracking.
          </p>
        </div>
      </section>

      {/* Role Selection */}
      <section className="container mx-auto px-4 py-8 md:py-16 relative">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <RoleCard
              title="Teacher"
              description="Create QR sessions and monitor student attendance in real-time"
              icon={Users}
              onClick={() => onNavigate("teacher-auth")}
              variant="primary"
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <RoleCard
              title="Student"
              description="Scan QR codes to mark your attendance quickly and easily"
              icon={GraduationCap}
              onClick={() => onNavigate("student-entry")}
              variant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-5 shadow-sm border border-border hover-lift animate-slide-up cursor-default"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "both" }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Mindset Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24 rounded-t-[3rem] mt-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full animate-float" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-2xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <p className="font-serif text-2xl md:text-4xl leading-relaxed">
              Within Any <span className="inline-block">✦</span> Career Field, The
              Belief That You Can Improve Will Motivate You To{" "}
              <span className="underline decoration-wavy decoration-primary-foreground/50 underline-offset-8">
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
