import { DecodeOptions, JwtPayload, SignOptions } from "jsonwebtoken"

export interface JwtService {
    verify(token: string): Promise<string | JwtPayload>

    sign(payload: object, options?: SignOptions): Promise<string>

    decode(token: string, options?: DecodeOptions): Promise<string | JwtPayload | null>
}