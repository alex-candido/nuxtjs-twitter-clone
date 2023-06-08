import { userTransformerProps } from "~/@types/transformers"


export const userTransformer = (user: userTransformerProps) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
    handle: '@' + user.username
  }
}
