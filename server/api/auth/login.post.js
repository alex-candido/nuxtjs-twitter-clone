export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { username, password } = body

    if(!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    // Is the user registered 
    const user = getUserByUsername(username)

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    // Compare passwords

    // Generate Tokens

    return {
        user: user
    }
})