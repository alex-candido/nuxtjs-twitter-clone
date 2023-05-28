import { H3Event } from "h3";
import jwt from "jsonwebtoken";

interface userProps  {
    id: string,
}

interface User {
  userId: string;
  iat: number;
  exp: number;
}

const generateAccessToken = (user: userProps) => {
    const config  = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
        expiresIn: '10m'
    })
}

const generateRefreshToken = (user: userProps) => {
    const config  = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
        expiresIn: '4h'
    })
}

export const decodeRefreshToken = async (token: string): Promise<User | undefined> => {
    const config = useRuntimeConfig()

    try {
      const decoded = ( await jwt.verify(
        token,
        config.jwtRefreshSecret
      )) as User

      return {
        userId: decoded.userId,
        iat: decoded.iat,
        exp: decoded.exp
      }
    } catch (error) {
        console.log(error)
    }
}

export const generateTokens = (user: userProps ) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export const sendRefreshToken = (event: H3Event, token: string) => {
    setCookie(event, "refresh_token", token, {
        httpOnly: true,
        sameSite: true
    })
}
