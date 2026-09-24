import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { PasswordStrength } from "../components/ui/PasswordStrength";
import { registerUser } from "../lib/api";
import { registerSchema } from "@betconvert/shared";

export const Register: React.FC = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", username: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); setServerError(null);
    // Combine first+last for full name display; schema expects firstName/lastName
    const full = form.firstName.trim();
    const parts = full.split(/\s+/);
    const payload = {
      firstName: parts[0] || full,
      lastName: parts.slice(1).join(" ") || parts[0] || "User",
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };
    const v = registerSchema.safeParse(payload);
    if (!v.success) {
      const fe: Record<string, string> = {};
      v.error.errors.forEach((err) => { if (err.path[0]) fe[String(err.path[0])] = err.message; });
      setErrors(fe); return;
    }
    setLoading(true);
    try { await registerUser(v.data); nav("/converter"); }
    catch (err: any) { setServerError(err.message || "Registration failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[100dvh] bg-app flex flex-col px-5 pt-8 pb-10 max-w-lg mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green mb-2">Join the Lineup</p>
      <h1 className="font-extrabold text-2xl text-t-primary mb-1">Create your account</h1>
      <p className="text-sm text-t-secondary mb-8">Convert, track and manage every code.</p>

      <form onSubmit={submit} className="flex flex-col gap-3.5">
        <Input label="Full Name" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} error={errors.firstName} placeholder="Adebayo Johnson" />
        <Input label="Username" value={form.username} onChange={(e) => set("username", e.target.value.toLowerCase())} error={errors.username} placeholder="bayo10" />
        <Input label="Email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} error={errors.email} placeholder="you@example.com" />
        <Input label="Phone Number" value={form.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} placeholder="801 234 5678" leftAddon="+234" />
        <div className="flex flex-col gap-1.5">
          <Input label="Password" type="password" showToggle value={form.password} onChange={(e) => set("password", e.target.value)} error={errors.password} placeholder="••••••••" />
          <PasswordStrength password={form.password} />
        </div>
        {serverError && <div className="p-3 rounded-xl bg-red-dim border border-red/20 text-red text-xs">{serverError}</div>}
        <Button type="submit" size="lg" isLoading={loading} className="mt-2">Create Account</Button>
      </form>
      <p className="text-center text-xs text-t-muted mt-5">
        Already registered? <Link to="/login" className="text-green font-semibold">Sign in</Link>
      </p>
    </div>
  );
};
