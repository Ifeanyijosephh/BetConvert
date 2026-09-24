import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { requestPasswordReset } from "../lib/api";
import { forgotPasswordSchema } from "@betconvert/shared";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = forgotPasswordSchema.safeParse({ email });
    if (!v.success) { setError(v.error.errors[0]?.message || "Invalid email"); return; }
    setLoading(true);
    try { await requestPasswordReset(email); setDone(true); }
    catch (err: any) { setError(err.message || "Failed to send reset link"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[100dvh] bg-app flex flex-col px-5 pt-8 pb-10 max-w-lg mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green mb-2">Account Recovery</p>
      <h1 className="font-extrabold text-2xl text-t-primary mb-1">Reset your password</h1>
      <p className="text-sm text-t-secondary mb-8">Enter the email linked to your account and we&apos;ll send a secure reset link.</p>

      {done ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-green-dim flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-green" />
          </div>
          <h2 className="font-bold text-lg">Check your inbox</h2>
          <p className="text-sm text-t-secondary">Reset instructions sent to<br /><span className="text-t-primary font-medium">{email}</span></p>
          <Link to="/login" className="w-full mt-4"><Button variant="secondary" size="lg">Back to Sign In</Button></Link>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error || undefined} placeholder="you@email.com" />
          <Button type="submit" size="lg" isLoading={loading}>Send Reset Link</Button>
          <Link to="/login"><Button type="button" variant="outline" size="lg">Back to Sign In</Button></Link>
        </form>
      )}
    </div>
  );
};
