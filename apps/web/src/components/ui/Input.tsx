import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftAddon?: React.ReactNode;
  rightElement?: React.ReactNode;
  showToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftAddon, rightElement, showToggle, type = "text", className = "", ...props }, ref) => {
    const [show, setShow] = useState(false);
    const isPass = type === "password" || showToggle;
    const t = isPass ? (show ? "text" : "password") : type;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && <label className="text-[11px] font-semibold uppercase tracking-wider text-t-muted">{label}</label>}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-0 top-0 bottom-0 flex items-center px-3.5 border-r border-border text-t-secondary text-sm font-medium bg-surface-2 rounded-l-xl">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            type={t}
            className={`w-full bg-input border border-border rounded-xl py-3.5 text-sm font-medium text-t-primary placeholder:text-t-muted focus:outline-none focus:border-green transition-colors min-h-[48px] ${leftAddon ? "pl-[4.5rem]" : "px-4"} ${isPass || rightElement ? "pr-12" : "pr-4"} ${error ? "border-red" : ""} ${className}`}
            {...props}
          />
          {isPass && (
            <button type="button" onClick={() => setShow(!show)}
              className="absolute right-3.5 text-[10px] font-bold uppercase tracking-wider text-t-muted hover:text-green transition-colors">
              {show ? "HIDE" : "SHOW"}
            </button>
          )}
          {rightElement && !isPass && <div className="absolute right-3">{rightElement}</div>}
        </div>
        {error && <span className="text-xs text-red font-medium">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
