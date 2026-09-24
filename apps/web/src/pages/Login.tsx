import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { loginUser } from "../lib/api";
import { loginSchema } from "@betconvert/shared";

export const Login: React.FC = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); setServerError(null);
    const v = loginSchema.safeParse({ email, password });
    if (!v.success) {
      const fe: Record<string, string> = {};
      v.error.errors.forEach((err) => { if (err.path[0]) fe[String(err.path[0])] = err.message; });
      setErrors(fe); return;
    }
    setLoading(true);
    try { await loginUser(v.data); nav("/converter"); }
    catch (err: any) { setServerError(err.message || "Invalid credentials"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[100dvh] bg-app flex flex-col px-5 pt-8 pb-10 max-w-lg mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green mb-2">Welcome Back</p>
      <h1 className="font-extrabold text-2xl text-t-primary mb-1">Matchday starts here.</h1>
      <p className="text-sm text-t-secondary mb-8">Sign in to your BET FORGE account.</p>

      <form onSubmit={submit} className="flex flex-col gap-4 flex-1">
        <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@email.com" />
        <Input label="Password" type="password" showToggle value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} placeholder="••••••••" />
        <div className="flex justify-end -mt-2">
          <Link to="/forgot-password" className="text-xs text-t-muted hover:text-green">Forgot password?</Link>
        </div>
        {serverError && <div className="p-3 rounded-xl bg-red-dim border border-red/20 text-red text-xs">{serverError}</div>}
        <Button type="submit" size="lg" isLoading={loading}>Sign In</Button>
        <Link to="/register">
          <Button type="button" variant="secondary" size="lg">Create Account</Button>
        </Link>
      </form>
      <p className="text-center text-[10px] text-t-muted mt-6">Protected with bank-grade encryption</p>
    </div>
  );
};
