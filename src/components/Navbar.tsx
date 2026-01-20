import { Code2, Menu, X } from "lucide-react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate("landing")}
          className="font-serif text-2xl font-medium tracking-tight hover:opacity-80 transition-smooth"
        >
          <span className="text-secondary">F</span>ET Smart
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                currentPage === link.id ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Developers Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("developers")}
            className="rounded-full gap-2 border-foreground/20 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-smooth"
          >
            <Code2 className="w-4 h-4" />
            <span>Developers</span>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-medium transition-smooth hover:text-primary ${
                  currentPage === link.id ? "text-primary" : "text-foreground/70"
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
              className="rounded-full gap-2 border-foreground/20 w-fit hover:bg-secondary hover:text-secondary-foreground transition-smooth"
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
