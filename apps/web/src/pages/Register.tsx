import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { registerUser } from "../lib/api";
import { registerSchema } from "@betconvert/shared";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const validation = registerSchema.safeParse(formData);
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
      await registerUser(validation.data);
      navigate("/converter");
    } catch (err: any) {
      setServerError(err.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col gap-4 pb-20">
      <div className="text-center">
        <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-text-primary">
          Join <span className="text-brand">BetConvert</span>
        </h1>
        <p className="text-xs text-text-secondary">Get 3 free daily code conversions</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
              placeholder="e.g. John"
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
              placeholder="e.g. Doe"
            />
          </div>

          <Input
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
            error={errors.username}
            placeholder="johndoe_99"
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="john@example.com"
          />

          <Input
            label="Phone (Optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            placeholder="08012345678"
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            placeholder="••••••••"
          />

          {serverError && (
            <div className="p-2.5 rounded-xl bg-status-danger/10 border border-status-danger/30 text-status-danger text-xs">
              {serverError}
            </div>
          )}

          <Button type="submit" size="lg" isLoading={isLoading} className="w-full mt-2">
            Create Free Account
          </Button>
        </form>

        <div className="text-center mt-4 pt-3 border-t border-border-subtle text-xs text-text-secondary">
          Already registered?{" "}
          <Link to="/login" className="font-bold text-brand hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};
