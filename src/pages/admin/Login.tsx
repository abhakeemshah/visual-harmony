import { useState } from "react";
import { ArrowLeft, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminLoginProps {
  onNavigate: (page: string) => void;
}

export function AdminLogin({ onNavigate }: AdminLoginProps) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call: POST /api/auth/admin
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    // Navigate to dashboard after successful login
    onNavigate("admin-dashboard");
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label="Go back to home"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-background" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-2xl font-medium">Admin Login</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Sign in to access administration features
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminId">Admin ID or Email</Label>
              <Input
                id="adminId"
                type="text"
                placeholder="admin@school.edu"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
                className="rounded-xl"
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl"
                aria-required="true"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-foreground hover:bg-foreground/90 text-background"
              aria-label={isLoading ? "Signing in, please wait" : "Login to admin panel"}
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
