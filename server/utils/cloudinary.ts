import cloudinary from "cloudinary"

const useCloudinary = () => {
  const config = useRuntimeConfig()

  return cloudinary.v2.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  })
}

export const uploadToCloudinary = (image: any) => {
  return new Promise ((resolve, reject) => {
    console.log(image)
    useCloudinary().v2.uploader.upload(image, (error: any, data: any) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    })
  })
}
