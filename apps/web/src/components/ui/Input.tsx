import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightElement, type = "text", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const computedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-text-muted pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={computedType}
            className={`w-full bg-surface border rounded-xl py-3 px-4 text-sm font-medium text-text-primary placeholder:text-text-muted transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand/40 min-h-[48px] ${
              leftIcon ? "pl-11" : ""
            } ${isPassword || rightElement ? "pr-11" : ""} ${
              error ? "border-status-danger focus:ring-status-danger/40" : "border-border-subtle focus:border-brand"
            } ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 p-1 text-text-muted hover:text-text-primary focus:outline-none transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
          {rightElement && !isPassword && (
            <div className="absolute right-3 flex items-center">{rightElement}</div>
          )}
        </div>
        {error && <span className="text-xs font-medium text-status-danger animate-fade-in">{error}</span>}
        {helperText && !error && <span className="text-xs text-text-muted">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
