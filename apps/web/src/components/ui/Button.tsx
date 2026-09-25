import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const base = "relative inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none focus:outline-none";

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-lg gap-1.5",
    md: "px-5 py-3 text-sm rounded-xl gap-2",
    lg: "px-6 py-4 text-base rounded-xl gap-2",
  };

  const variants = {
    primary: "bg-brand text-brand-fg hover:bg-brand-hover shadow-glow",
    secondary: "bg-surface-subtle text-text-primary hover:bg-border-subtle",
    outline: "bg-transparent border border-brand text-brand hover:bg-brand/10",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-subtle",
    danger: "bg-status-danger text-white hover:bg-status-danger/90",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};