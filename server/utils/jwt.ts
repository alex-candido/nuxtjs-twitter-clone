import jwt from "jsonwebtoken";

interface userProps  {
    id: string,
}

const generateAccessToken = (user: userProps) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
        expiresIn: '10m'
    })
}

const generateRefreshToken = (user: userProps) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
        expiresIn: '4h'
    })
}

export const generateTokens = (user: userProps) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export const sendRefreshToken = (event: any, token: string) => {
    setCookie(event.res, "refresh_token", token, {
        httpOnly: true,
        sameSite: true
    })
}