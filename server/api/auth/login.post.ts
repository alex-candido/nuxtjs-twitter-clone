import { getUserByUsername } from "../../db/users.js"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js"
import { userTransformer } from "~~/server/transformers/user.js"
import { createRefreshToken } from "../../db/refreshTokens.js"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    const { username, password } = body;

    if(!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }));
    }

    // Is the user registered 
    const user = await getUserByUsername(username);

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }));
    }

    // Compare passwords
    const doesThePasswordMatch = await bcrypt.compare(password, user.password);

    // Generate Tokens
    // Access token
    // Refresh token
    const { accessToken, refreshToken  } = generateTokens();

    return {
        access_token: accessToken,
        user: userTransformer
    }
})