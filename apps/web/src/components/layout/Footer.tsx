import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-xs text-text-muted border-t border-border-subtle">
      <p>© {new Date().getFullYear()} BetConvert. Independent conversion utility.</p>
    </footer>
  );
};
