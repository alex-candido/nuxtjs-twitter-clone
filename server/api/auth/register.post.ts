import { H3Event, sendError } from "h3";

import { createUser } from "~/server/db/users";
import { userTransformer } from "~/server/transformers/user";

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event);

  if (method !== "POST") {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
  }

  try {
    const body = await readBody(event);

    const { username, email, password, repeatPassword, name } = body

    if ( !username || !email || !password || !repeatPassword || !name ) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid credentials' }))
    }

    if ( password !== repeatPassword ) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match'}))
    }

    const userData = {
      username,
      email,
      password,
      name,
      profileImage: 'https://picsum.photos/200/200'
    }

    const user = await createUser(userData)

    return { body: userTransformer(user), method: method }
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error'}))
  }
});
