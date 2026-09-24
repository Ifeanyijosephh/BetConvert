import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "interactive";
}

export const Card: React.FC<CardProps> = ({ children, variant = "default", className = "", ...props }) => {
  const styles = {
    default: "bg-surface border border-border-subtle shadow-card",
    subtle: "bg-surface-subtle/50 border border-border-subtle/60",
    interactive: "bg-surface border border-border-subtle hover:border-brand/50 transition-all duration-200 cursor-pointer shadow-card hover:shadow-glow hover:shadow-brand/5 active:scale-[0.99]",
  };

  return (
    <div className={`rounded-2xl p-4 md:p-5 ${styles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
