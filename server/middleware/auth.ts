import URLPattern from "url-pattern";

import { sendError } from "h3";
import { getUserById } from "../db/users";
import { decodeAccessToken } from "../utils/jwt.js";

export default defineEventHandler(async (event) => {
  const endpoints = [
    '/api/auth/user',
  ]

  const getRequest = getRequestURL(event)

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new URLPattern(endpoint);

    return pattern.match(getRequest.pathname)
  })

  if (!isHandledByThisMiddleware) return;

  const cookie = event.node.req.headers.cookie

  if (!cookie) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    }))
  }



  const authorizationToken = cookie.substring(cookie.indexOf("=") + 1)

  if (!authorizationToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    }))
  }

  const token = await decodeAccessToken(authorizationToken);

  if (!token) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
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

    event.context.auth = { user }
  } catch (error) {
		return sendError(event, createError({ statusCode: 404, statusMessage: 'Refresh token is invalid' }));
	}
})
