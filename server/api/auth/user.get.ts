export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  
  if (method !== "POST") {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
  }

  try {
  
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error'}))
  }
})