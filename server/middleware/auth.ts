import URLPattern from 'url-pattern';

import { H3Event, sendError } from "h3";
import { getUserById } from "../db/users";
import { decodeAccessToken } from "../utils/jwt.js";

export default defineEventHandler(async (event: H3Event) => {
  const endpoints = [
    '/api/auth/user',
    '/api/user/tweets',
    '/api/tweets',
    '/api/tweets/:id'
  ]

  const { request, headers, context } = await readBody(event);

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new URLPattern(endpoint);

    return pattern.match(request.url)
  })

  if (!isHandledByThisMiddleware) return;

  const authorizationToken = headers['authorization']?.split(' ')[1];

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

    context.auth = { user }
  } catch (error) {
    if (error instanceof Error) {
      return sendError(event, createError({ statusCode: 404, statusMessage: error.message }));
    }
	}
})
