import { ArrowLeft, Github, Linkedin, Mail, Heart, Coffee } from "lucide-react";

interface DevelopersProps {
  onNavigate: (page: string) => void;
}

const developers = [
  {
    name: "Ahmad Hassan",
    role: "Full Stack Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad&backgroundColor=c0aede",
    bio: "Passionate about creating seamless user experiences and building scalable backend solutions. Loves turning complex problems into simple, beautiful solutions.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "ahmad@fetsmart.edu",
    specialty: "Backend & APIs",
  },
  {
    name: "Sarah Khan",
    role: "UI/UX Designer & Frontend",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=ffd5dc",
    bio: "Crafting intuitive interfaces that make education technology accessible to everyone. Believes design should be both beautiful and functional.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "sarah@fetsmart.edu",
    specialty: "Design & Frontend",
  },
];

export function Developers({ onNavigate }: DevelopersProps) {
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-2 py-1"
            aria-label="Return to home"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="text-center mb-16 animate-slide-up">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              Meet the <span className="text-primary">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              The brilliant minds behind FET Smart Attendance System, dedicated to 
              revolutionizing attendance tracking.
            </p>
          </div>

          {/* Developers - Side by Side for 2 people */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {developers.map((dev, index) => (
              <div
                key={dev.name}
                className="bg-card rounded-3xl p-8 shadow-xl border border-border hover-lift animate-slide-up group"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
              >
                {/* Avatar */}
                <div className="relative w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden bg-muted ring-4 ring-border group-hover:ring-primary/30 transition-all duration-500">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-medium mb-1">{dev.name}</h3>
                  <p className="text-primary font-medium text-sm">{dev.role}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                    {dev.specialty}
                  </span>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{dev.bio}</p>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={`${dev.name}'s GitHub`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-muted hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                    aria-label={`${dev.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${dev.email}`}
                    className="p-3 rounded-xl bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    aria-label={`Email ${dev.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Project Info Card */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-10 text-center animate-slide-up border border-border" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-destructive animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Built with love</span>
              <Coffee className="w-5 h-5 text-highlight" />
            </div>
            <h2 className="font-serif text-2xl mb-4">About This Project</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              FET Smart is an innovative QR-based attendance system designed for 
              educational institutions. Built with modern technologies to ensure 
              reliability, security, and ease of use.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["React", "TypeScript", "Tailwind CSS", "Supabase"].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 rounded-full bg-card text-sm font-medium border border-border hover:border-primary transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
