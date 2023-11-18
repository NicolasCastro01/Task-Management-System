import jwt, { DecodeOptions, JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "~/config/app";
dotenv.config();

export class JwtService  {
    protected readonly secretOrPrivateKey: string;

    constructor() {
        this.secretOrPrivateKey = JWT_SECRET;
     }

    async verify(token: string): Promise<string | JwtPayload> {
        return jwt.verify(token, this.secretOrPrivateKey);
    }

    async sign(payload: object, options?: SignOptions): Promise<string> {
        return jwt.sign(payload, this.secretOrPrivateKey, options);
    }

    async decode(token: string, options?: DecodeOptions): Promise<string | JwtPayload | null> {
        return jwt.decode(token, options);
    }
}