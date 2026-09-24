import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { requestPasswordReset } from "../lib/api";
import { forgotPasswordSchema } from "@betconvert/shared/src/validators";
import { CheckCircle2 } from "lucide-react";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || "Invalid email");
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to request password reset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12 flex flex-col gap-4 pb-20">
      <div className="text-center">
        <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-text-primary">
          Reset <span className="text-brand">Password</span>
        </h1>
        <p className="text-xs text-text-secondary">Enter your email for a secure reset link</p>
      </div>

      <Card>
        {isSubmitted ? (
          <div className="flex flex-col items-center gap-3 text-center py-4">
            <CheckCircle2 className="w-12 h-12 text-status-success" />
            <h2 className="font-display font-bold text-base uppercase text-text-primary">Check Your Email</h2>
            <p className="text-xs text-text-secondary">We have sent a password reset link to {email}.</p>
            <Link to="/login" className="w-full mt-2">
              <Button variant="secondary" className="w-full">Back to Sign In</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error || undefined}
              placeholder="you@example.com"
            />
            <Button type="submit" size="lg" isLoading={isLoading} className="w-full mt-2">
              Send Reset Link
            </Button>
            <div className="text-center mt-2">
              <Link to="/login" className="text-xs text-text-secondary hover:text-brand">
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};
