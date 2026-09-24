import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { loginUser } from "../lib/api";
import { loginSchema } from "@betconvert/shared";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await loginUser(validation.data);
      navigate("/converter");
    } catch (err: any) {
      setServerError(err.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12 flex flex-col gap-4 pb-20">
      <div className="text-center">
        <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-text-primary">
          Welcome <span className="text-brand">Back</span>
        </h1>
        <p className="text-xs text-text-secondary">Sign in to convert bet slips</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
          />

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs text-text-secondary hover:text-brand">
              Forgot password?
            </Link>
          </div>

          {serverError && (
            <div className="p-2.5 rounded-xl bg-status-danger/10 border border-status-danger/30 text-status-danger text-xs">
              {serverError}
            </div>
          )}

          <Button type="submit" size="lg" isLoading={isLoading} className="w-full mt-2">
            Sign In
          </Button>
        </form>

        <div className="text-center mt-4 pt-3 border-t border-border-subtle text-xs text-text-secondary">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-brand hover:underline">
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
};
