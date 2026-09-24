import React from "react";
export const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red", "bg-amber", "bg-green/60", "bg-green"];
  if (!password) return null;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {[1,2,3,4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= score ? colors[score] : "bg-border"}`} />
        ))}
      </div>
      <span className={`text-[10px] font-semibold ${score >= 3 ? "text-green" : score >= 2 ? "text-amber" : "text-red"}`}>
        {labels[score]} password
      </span>
    </div>
  );
};
