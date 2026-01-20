import { ArrowLeft, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DevelopersProps {
  onNavigate: (page: string) => void;
}

const developers = [
  {
    name: "Ahmad Hassan",
    role: "Full Stack Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
    bio: "Passionate about creating seamless user experiences and scalable backend solutions.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "ahmad@fetsmart.edu",
  },
  {
    name: "Sarah Khan",
    role: "UI/UX Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Crafting intuitive interfaces that make education technology accessible to everyone.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "sarah@fetsmart.edu",
  },
  {
    name: "Muhammad Ali",
    role: "Backend Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali",
    bio: "Building robust APIs and ensuring data security for educational institutions.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "ali@fetsmart.edu",
  },
];

export function Developers({ onNavigate }: DevelopersProps) {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-8 focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label="Return to home"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>

          <div className="text-center mb-12 animate-slide-up">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              Meet the <span className="text-primary">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind FET Smart Attendance System, dedicated to 
              revolutionizing how educational institutions track attendance.
            </p>
          </div>

          {/* Developers Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {developers.map((dev, index) => (
              <div
                key={dev.name}
                className="bg-card rounded-3xl p-6 shadow-lg border border-border hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-muted">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="font-serif text-xl font-medium">{dev.name}</h3>
                  <p className="text-sm text-secondary font-medium">{dev.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">{dev.bio}</p>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-secondary hover:text-secondary-foreground transition-smooth"
                    aria-label={`${dev.name}'s GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-secondary hover:text-secondary-foreground transition-smooth"
                    aria-label={`${dev.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${dev.email}`}
                    className="p-2 rounded-full bg-muted hover:bg-secondary hover:text-secondary-foreground transition-smooth"
                    aria-label={`Email ${dev.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Project Info */}
          <div className="mt-16 bg-secondary/10 rounded-3xl p-8 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-serif text-2xl mb-4">About This Project</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              FET Smart is an innovative QR-based attendance system designed for 
              educational institutions. Built with modern technologies to ensure 
              reliability, security, and ease of use.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-card text-sm font-medium">React</span>
              <span className="px-4 py-2 rounded-full bg-card text-sm font-medium">TypeScript</span>
              <span className="px-4 py-2 rounded-full bg-card text-sm font-medium">Tailwind CSS</span>
              <span className="px-4 py-2 rounded-full bg-card text-sm font-medium">Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
