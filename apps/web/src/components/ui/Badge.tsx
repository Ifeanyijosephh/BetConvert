import React from "react";

export type BadgeVariant = "success" | "warning" | "danger" | "brand" | "neutral";

export const Badge: React.FC<{ variant?: BadgeVariant; children: React.ReactNode; className?: string }> = ({
  variant = "neutral",
  children,
  className = "",
}) => {
  const styles = {
    success: "bg-status-success-bg text-status-success border-status-success/20",
    warning: "bg-status-warning-bg text-status-warning border-status-warning/20",
    danger: "bg-status-danger-bg text-status-danger border-status-danger/20",
    brand: "bg-accent-1/10 text-accent-1 border-accent-1/20",
    neutral: "bg-surface-subtle/50 text-text-secondary border-border-subtle",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};
