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
  children, variant = "primary", size = "md", isLoading, leftIcon, rightIcon,
  className = "", disabled, ...props
}) => {
  const base = "inline-flex items-center justify-center font-bold tracking-wide uppercase rounded-xl transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none select-none focus:outline-none";
  const sizes = {
    sm: "px-3.5 py-2 text-[11px] min-h-[36px] gap-1.5",
    md: "px-5 py-3 text-xs min-h-[48px] gap-2",
    lg: "px-6 py-4 text-sm min-h-[56px] gap-2.5 w-full",
  };
  const variants = {
    primary: "btn-green",
    secondary: "bg-surface-2 text-t-primary border border-border hover:bg-surface",
    outline: "bg-transparent border border-border text-t-secondary hover:text-t-primary hover:border-t-muted",
    ghost: "bg-transparent text-t-secondary hover:text-t-primary",
    danger: "bg-red text-white hover:bg-red/90",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} disabled={disabled || isLoading} {...props}>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
        <>
          {leftIcon}<span>{children}</span>{rightIcon}
        </>
      )}
    </button>
  );
};
