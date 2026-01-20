import { Code2, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "landing", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-2 py-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-medium tracking-tight">
            <span className="text-primary">FET</span>
            <span className="text-foreground"> Smart</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium transition-all duration-300 hover:text-primary relative ${
                currentPage === link.id ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
              {currentPage === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Developers Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("developers")}
            className="rounded-full gap-2 border-border hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300"
          >
            <Code2 className="w-4 h-4" />
            <span>Developers</span>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-xl transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-medium py-2 px-3 rounded-xl transition-all duration-300 ${
                  currentPage === link.id 
                    ? "text-primary bg-primary/10" 
                    : "text-foreground/70 hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onNavigate("developers");
                setMobileMenuOpen(false);
              }}
              className="rounded-full gap-2 border-border w-fit hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 mt-2"
            >
              <Code2 className="w-4 h-4" />
              <span>Developers</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
