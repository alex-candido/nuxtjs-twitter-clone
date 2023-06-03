import formidable, { Fields, Files } from 'formidable';
import { sendError } from "h3";
import { tweetTransformer } from "~~/server/transformers/tweet.js";
import { createMediaFile } from "../../../db/mediaFiles.js";
import { createTweet } from "../../../db/tweets.js";
import { uploadToCloudinary } from "../../../utils/cloudinary.js";

interface FieldsProps {
  text: string;
}

interface ImageProps {
  size: number;
  filepath: string;
  newFilename: string;
  mimetype: string;
  mtime: string;
  originalFilename: string
}

interface filesProps {
  image: ImageProps;
}

interface FormidableProps {
  fields: Fields | FieldsProps;
  files: Files | filesProps;
}

interface CloudinaryResourceProps {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method !== "POST") {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
  }

  const form = formidable({})

  const response:FormidableProps = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields: Fields, files: Files) => {
      if (err) {
        reject(err)
      }
      resolve({ fields, files })
    })
  })

  const { fields, files } = response

  const userId = event.context.auth.user.id

  const tweetData = {
    text: fields.text,
    authorId: userId
  }

  const tweet = await createTweet(tweetData)

  try {
    const filePromises = Object.keys(files).map(async (index) => {
      const filter = files[index as keyof typeof files] as ImageProps

      const cloudinaryResource = await uploadToCloudinary(filter.filepath) as CloudinaryResourceProps

      return createMediaFile({
        url: cloudinaryResource.secure_url,
        providerPublicId: cloudinaryResource.public_id,
        userId: userId,
        tweetId: tweet.id
      })
    })

    await Promise.all(filePromises)

    return {
      tweet: tweetTransformer(tweet)
    }
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }))
  }
})
