import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { fetchCurrentProfile, fetchUserBalance, logoutUser } from "../lib/api";
import type { Profile } from "@betconvert/shared";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  balance: number;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  balance: 0,
  loading: true,
  refreshProfile: async () => {},
  refreshUserData: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [balance, setBalance] = useState<number>(24);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUserData = async () => {
    try {
      const currentProfile = await fetchCurrentProfile();
      setProfile(currentProfile);
      const bal = await fetchUserBalance();
      setBalance(bal.credits);
    } catch (err) {
      console.error("Error loading user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData();
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData();
      } else {
        setProfile(null);
        setBalance(0);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    await loadUserData();
  };

  const handleSignOut = async () => {
    await logoutUser();
    setUser(null);
    setSession(null);
    setProfile(null);
    setBalance(0);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      balance,
      loading,
      refreshProfile,
      refreshUserData: refreshProfile,
      signOut: handleSignOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
