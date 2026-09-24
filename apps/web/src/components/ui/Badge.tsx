import React from "react";

export type BadgeVariant = "success" | "warning" | "danger" | "brand" | "neutral";

export const Badge: React.FC<{ variant?: BadgeVariant; children: React.ReactNode; className?: string }> = ({
  variant = "neutral",
  children,
  className = "",
}) => {
  const badgeStyles = {
    success: "bg-status-success/15 text-status-success border-status-success/30",
    warning: "bg-status-warning/15 text-status-warning border-status-warning/30",
    danger: "bg-status-danger/15 text-status-danger border-status-danger/30",
    brand: "bg-brand/15 text-brand border-brand/30",
    neutral: "bg-surface-subtle text-text-secondary border-border-subtle",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${badgeStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
