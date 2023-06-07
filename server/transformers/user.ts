interface userTransformerProps {
  id: string;
  email: string;
  name: string | null;
  username: string;
  password: string;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

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
