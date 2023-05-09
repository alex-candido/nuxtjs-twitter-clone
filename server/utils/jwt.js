import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {

}

const generateRefreshToken = (user) => {
    
}

export const generateTokens = (user) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}