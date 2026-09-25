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
       res.status(401).json({ error: "Missing or invalid authorization header" });
       return;
    }

    const token = authHeader.split(" ")[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
       res.status(401).json({ error: "Unauthorized: Invalid token" });
       return;
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server authentication error" });
  }
};
