import { useAuth } from "./useAuth";

export function useWallet() {
  const { balance, refreshUserData } = useAuth();
  return {
    balance,
    rateNaira: 200,
    refreshBalance: refreshUserData,
  };
}
