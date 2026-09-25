import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../lib/supabase";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("[auth] Request rejected: Missing or malformed Authorization header.");
      res.status(401).json({ error: "Unauthorized: Missing authorization token. Please log in first." });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "undefined" || token === "null") {
      console.warn("[auth] Request rejected: Null or undefined token string.");
      res.status(401).json({ error: "Unauthorized: Invalid token string. Please log in again." });
      return;
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      const errorMsg = error?.message || "User session not found";
      console.error(`[auth] Supabase token verification failed: ${errorMsg}`);
      res.status(401).json({
        error: `Unauthorized: ${errorMsg}. Please log in again.`
      });
      return;
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err: any) {
    console.error("[auth] Unexpected error in requireAuth middleware:", err);
    res.status(500).json({ error: "Internal server authentication error" });
  }
};
