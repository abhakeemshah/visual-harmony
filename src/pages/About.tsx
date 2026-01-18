import {
  QrCode,
  Clock,
  Users,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";

interface AboutProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    icon: QrCode,
    title: "QR-Based Marking",
    description: "Students scan time-bound QR codes to mark attendance instantly",
    color: "bg-secondary",
  },
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description: "Watch attendance fill up live as students scan their codes",
    color: "bg-accent",
  },
  {
    icon: Shield,
    title: "Fraud Prevention",
    description: "Time-limited codes and device tracking prevent proxy attendance",
    color: "bg-primary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "No paper, no delays—attendance recorded in seconds",
    color: "bg-highlight",
  },
  {
    icon: Users,
    title: "Class Management",
    description: "Organize sessions by class, group, or subject easily",
    color: "bg-secondary",
  },
  {
    icon: CheckCircle,
    title: "Accurate Reports",
    description: "Export detailed attendance reports for analysis and records",
    color: "bg-accent",
  },
];

const steps = [
  {
    number: 1,
    title: "Teacher Creates Session",
    description: "Set duration and expected students, then start the session",
  },
  {
    number: 2,
    title: "QR Code Displayed",
    description: "A time-bound QR code appears on the teacher's screen",
  },
  {
    number: 3,
    title: "Students Scan",
    description: "Students scan the QR with their device to mark attendance",
  },
];

export function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-medium">
            About FET Smart Attendance
          </h1>
          <p className="text-lg text-muted-foreground">
            A modern solution for effortless, accurate, and fraud-proof attendance
            tracking in educational institutions.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              Our Mission
            </div>
            <p className="font-serif text-2xl md:text-3xl leading-relaxed">
              To transform classroom attendance from a tedious task into a
              seamless, technology-driven experience that saves time, ensures
              accuracy, and empowers educators.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Why Choose FET Smart?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div
                className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary text-secondary-foreground py-16 rounded-[3rem]">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-3xl">{step.number}</span>
                </div>
                <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                <p className="text-secondary-foreground/80 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-3xl mb-6">Ready to Get Started?</h2>
        <button
          onClick={() => onNavigate("landing")}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Go to Home
        </button>
      </section>
    </div>
  );
}
