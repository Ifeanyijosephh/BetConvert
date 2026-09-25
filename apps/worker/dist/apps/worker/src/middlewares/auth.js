import { supabaseAdmin } from "../lib/supabase";
export const requireAuth = async (req, res, next) => {
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
    }
    catch (err) {
        res.status(500).json({ error: "Internal server authentication error" });
    }
};
