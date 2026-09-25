import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Zap } from "lucide-react";

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-app flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 bg-brand-neon/10 rounded-2xl flex items-center justify-center mb-4 border border-brand-neon/30 animate-pulse">
          <Zap className="w-6 h-6 text-brand-neon animate-spin" />
        </div>
        <p className="text-text-secondary text-sm font-medium">Loading BetForge Engine...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
