"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRequestSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = exports.bookmakerEnum = void 0;
const zod_1 = require("zod");
exports.bookmakerEnum = zod_1.z.enum([
    "sportybet",
    "bet9ja",
    "1xbet",
    "betking",
    "bangbet",
    "bcgame",
    "paripesa",
    "22bet",
    "mozzartbet",
    "betway",
    "melbet",
    "msport"
]);
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Full name must be at least 2 characters"),
    username: zod_1.z.string().min(3, "Username must be at least 3 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    phone: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
});
exports.convertRequestSchema = zod_1.z.object({
    fromBookmaker: exports.bookmakerEnum,
    toBookmaker: exports.bookmakerEnum,
    bookingCode: zod_1.z.string().min(2, "Booking code is required"),
});
