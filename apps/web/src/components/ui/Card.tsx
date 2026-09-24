import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "interactive" | "flat";
}

export const Card: React.FC<CardProps> = ({ children, variant = "default", className = "", ...props }) => {
  const styles = {
    default: "bg-surface border border-border-subtle shadow-card",
    flat: "bg-surface-subtle/50 border border-border-subtle",
    glass: "glass-card shadow-glass border border-border-glass",
    interactive: "glass-card hover:shadow-glow-sm hover:border-brand/30 transition-all duration-300 cursor-pointer active:scale-[0.99]",
  };

  return (
    <div className={`rounded-3xl p-5 md:p-6 ${styles[variant] || styles.default} ${className}`} {...props}>
      {children}
    </div>
  );
};
