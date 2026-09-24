export type BookmakerCode = "sportybet" | "bet9ja" | "xbet" | "betking" | "betway" | "nairabet" | "livescorebet";
export type ConversionStatus = "success" | "partial" | "failed";
export type CreditTransactionType = "purchase" | "conversion_debit" | "refund" | "admin_adjustment" | "free_quota";
export interface CanonicalSelection {
    sport: "football" | "basketball" | "tennis";
    league: string;
    homeTeam: string;
    awayTeam: string;
    kickoffUtc: string;
    marketType: string;
    marketSelection: string;
    sourceOdds: number;
}
export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string | null;
    isAdmin: boolean;
    freeConversionsToday: number;
    dailyResetAt: string;
    createdAt: string;
    updatedAt: string;
}
export interface AuthState {
    user: {
        id: string;
        email: string;
    } | null;
    profile: UserProfile | null;
    session: {
        accessToken: string;
        expiresAt: number;
    } | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}
