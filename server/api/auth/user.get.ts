import { userTransformer } from "~/server/transformers/user";

export default defineEventHandler( async (event) => {

  try {
    return {
      user: userTransformer(event.context.auth.user),
    }
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error'}))
  }
})
