import React from "react";

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface border border-border-subtle rounded-t-2xl sm:rounded-2xl p-4 shadow-sheet animate-slide-up">
        {children}
      </div>
    </div>
  );
};
