import formidable from "formidable"
// import { tweetTransformer } from "~~/server/transformers/tweet.js"
// import { createTweet } from "../../../db/tweets.js"
// import { createMediaFile } from "../../../db/mediaFiles.js"
// import { uploadToCloudinary } from "../../../utils/cloudinary.js"

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise ((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      resolve({ fields, files })
    })
  })

  // const { fields, files } = response

  try {
    return {
      hello: response
    }
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error'}))
  }
})
