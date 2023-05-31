import bcrypt from "bcrypt";
import { H3Event, sendError } from "h3";

import { createRefreshToken } from "~/server/db/refreshTokens.js";
import { userTransformer } from "~/server/transformers/user.js";
import { getUserByUsername } from "../../db/users.js";
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js";

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event);

  if (method !== "POST") {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
  }


    const body = await readBody(event);

    const { username, password } = body;

    if (!username || !password) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Ivalid params",
        }),
      );
    }

    const user = await getUserByUsername(username);

    if (!user) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Username or password is invalid",
        }),
      );
    }

    const doesThePasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesThePasswordMatch) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Username or password is invalid",
        }),
      );
    }

    try {

    const { accessToken, refreshToken } = await generateTokens(user);

    await createRefreshToken({
      token: refreshToken,
      userId: user.id,
    });

    sendRefreshToken(event, refreshToken);

    return {
      access_token: accessToken,
      user: userTransformer(user),
      method: method,
      refreshToken: refreshToken
    };
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error'}))
  }
});
