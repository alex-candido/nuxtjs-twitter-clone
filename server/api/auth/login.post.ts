import bcrypt from "bcrypt"
import { sendError } from "h3"
import { createRefreshToken } from "~/server/db/refreshTokens.js"
import { userTransformer } from "~/server/transformers/user.js"
import { getUserByUsername } from "../../db/users.js"
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js"

export default defineEventHandler(async (event) => {
    //@ts-ignore
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

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }));
    }

    // Generate Tokens
    // Access token
    // Refresh token
    const { accessToken, refreshToken  } = generateTokens(user);

    // Save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // Add http only cookie
    sendRefreshToken(event, refreshToken);

    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
})