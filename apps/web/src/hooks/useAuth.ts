import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { fetchCurrentProfile, fetchUserBalance } from "../lib/api";
import { UserProfile, AuthState } from "@betconvert/shared";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const [balance, setBalance] = useState<number>(0);

  const refreshProfileAndBalance = useCallback(async (userId: string) => {
    try {
      const [profileData, balanceData] = await Promise.all([
        fetchCurrentProfile(userId),
        fetchUserBalance(userId),
      ]);
      setState((prev: AuthState) => ({
        ...prev,
        profile: profileData,
      }));
      setBalance(balanceData);
    } catch (err) {
      console.error("Error loading user profile/balance:", err);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      if (session?.user) {
        setState({
          user: { id: session.user.id, email: session.user.email ?? "" },
          profile: null,
          session: {
            accessToken: session.access_token,
            expiresAt: session.expires_at ?? 0,
          },
          isLoading: false,
          isAuthenticated: true,
        });
        refreshProfileAndBalance(session.user.id);
      } else {
        setState({
          user: null,
          profile: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
        });
        setBalance(0);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        setState({
          user: { id: session.user.id, email: session.user.email ?? "" },
          profile: null,
          session: {
            accessToken: session.access_token,
            expiresAt: session.expires_at ?? 0,
          },
          isLoading: false,
          isAuthenticated: true,
        });
        await refreshProfileAndBalance(session.user.id);
      } else {
        setState({
          user: null,
          profile: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
        });
        setBalance(0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshProfileAndBalance]);

  return {
    ...state,
    balance,
    refreshUserData: () => {
      if (state.user?.id) {
        return refreshProfileAndBalance(state.user.id);
      }
      return Promise.resolve();
    },
  };
}
