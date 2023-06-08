export interface userTransformerProps {
  id: string;
  email: string;
  name: string | null;
  username: string;
  password: string;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthorProps {
  id: string;
  email: string;
  name: string;
  username: string;
  password: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MediaFilesProps {
  id: string;
  url: string;
  providerPublicId?: string
  createdAt: Date;
  updatedAt: Date
  userId: string;
  tweetId: string;
}

export interface tweetDataProps {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  replyToId: string | null;
  author?: AuthorProps;
  mediaFiles?: Array<MediaFilesProps>;
  replies?: [];
	replyTo?: null;
}
