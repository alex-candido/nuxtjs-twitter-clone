import moment from 'moment';
import { mediaFileTransformer } from "./mediaFiles";
import { userTransformer } from "./user";

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
  createdAt?: Date;
  updatedAt?: Date
  userId?: string;
  tweetId?: string;
}

interface tweetDataProps {
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

export const tweetTransformer = (tweet: tweetDataProps): any => {
  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: !!tweet.mediaFiles ? tweet.mediaFiles.map(mediaFileTransformer) : [],
    author: !!tweet.author ? userTransformer(tweet.author) : null,
    replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
    repliesCount: !!tweet.replies ? tweet.replies.length : 0,
    postedAtHuman: moment(tweet.createdAt).fromNow()
  }
}

