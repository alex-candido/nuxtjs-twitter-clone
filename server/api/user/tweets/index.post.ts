import formidable, { Fields, Files } from "formidable";
import { tweetTransformer } from "~~/server/transformers/tweet.js";
import { createMediaFile } from "../../../db/mediaFiles.js";
import { createTweet } from "../../../db/tweets.js";
import { uploadToCloudinary } from "../../../utils/cloudinary.js";

interface formidableProps {
  fields: any;
  files: any;
}

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response: formidableProps = await new Promise ((resolve, reject) => {
    form.parse(event.node.req, (err, fields: Fields, files: Files) => {
      if (err) {
        reject(err)
      }
      resolve({ fields, files })
    })
  })

  const { fields, files } = response

  const userId = event.context?.auth.userId

  const tweetData = {
    text: fields.text,
    authorId: userId
  }

  const tweet = await createTweet(tweetData)

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key]

    const cloudinaryResource = await uploadToCloudinary()

    return createMediaFile({
      url: "",
      providerPublicId: "random_id",
      userId: userId,
      tweetId: tweet.id
    })
  })

  try {
    return {
      tweet: tweetTransformer(tweet)
    }
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error'}))
  }
})
