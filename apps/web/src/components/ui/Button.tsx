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
  const baseStyles =
    "relative inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-xl transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none focus:outline-none focus:ring-2 focus:ring-brand/50";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs min-h-[36px] gap-1.5",
    md: "px-4 py-2.5 text-sm min-h-[44px] gap-2",
    lg: "px-6 py-3.5 text-base min-h-[52px] gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-brand text-brand-fg hover:bg-brand-hover shadow-glow shadow-brand/20 active:shadow-none",
    secondary:
      "bg-surface-subtle text-text-primary hover:bg-surface-subtle/80 border border-border-subtle",
    outline:
      "bg-transparent border-2 border-brand text-brand hover:bg-brand/10",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-subtle",
    danger:
      "bg-status-danger text-white hover:bg-status-danger/90 active:bg-status-danger/80",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="transition-transform duration-150">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="transition-transform duration-150">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
