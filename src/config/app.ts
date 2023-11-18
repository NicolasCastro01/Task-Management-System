import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET ?? '';
export const SALT = Number(process.env.SALT);
export const EXPIRES_IN = String(process.env.EXPIRES_IN);
export const EXPIRES_IN_REFRESH_TOKEN = String(process.env.EXPIRES_IN_REFRESH_TOKEN);