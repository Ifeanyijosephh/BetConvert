import { useAuth } from "../context/AuthContext";

export function useWallet() {
  const { balance, refreshProfile, refreshUserData } = useAuth();
  return {
    balance,
    credits: balance,
    refreshWallet: refreshProfile || refreshUserData,
    refreshUserData: refreshProfile || refreshUserData,
  };
}
