import { useState } from "react";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeacherAuthProps {
  onNavigate: (page: string) => void;
}

export function TeacherAuth({ onNavigate }: TeacherAuthProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call: POST /api/auth/teacher/login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    onNavigate("teacher-create-session");
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label="Return to role selection"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-secondary-foreground" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-2xl font-medium">Teacher Login</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Enter your password to create attendance sessions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                className="rounded-xl"
                aria-required="true"
                aria-invalid={!!error}
                aria-describedby={error ? "password-error" : undefined}
              />
              {error && (
                <p id="password-error" className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              aria-label={isLoading ? "Signing in, please wait" : "Login"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
