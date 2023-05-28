import { H3Event, sendError } from "h3";

import { getRefreshTokenByToken } from "../../db/refreshTokens.js";
import { getUserById } from "../../db/users.js";
import { decodeRefreshToken, generateTokens } from "../../utils/jwt.js";

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event);

  if (method !== "GET") {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
  }

  const refreshToken = getCookie(event, 'refresh_token')

  if (!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid'
    }))
  }

  const currentRefreshToken = await getRefreshTokenByToken(refreshToken);

  if (!currentRefreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid'
    }))
  }

  const token = await decodeRefreshToken(refreshToken)

  if (!token) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'Refresh token is invalid'
    }))
  }

  try {
    const user = await getUserById(token?.userId)

    if (!user) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    const { accessToken } = generateTokens(user)

    return { access_token: accessToken }
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error'}))
  }
});
