export interface mediaFileProps {
  url: string;
  providerPublicId: string;
  userId: string;
  tweetId: string;
}

export interface userDataProps {
  username: string;
  email: string;
  password: string;
  name: string | null;
  profileImage: string;
}
