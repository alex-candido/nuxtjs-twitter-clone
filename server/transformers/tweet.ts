import moment from 'moment';
import { tweetDataProps } from '~/@types/transformers';
import { mediaFileTransformer } from "./mediaFiles";
import { userTransformer } from "./user";

export const tweetTransformer = (tweet: tweetDataProps): any => {
  return {
    id: tweet.id,
    text: tweet.text,
    createdAt: tweet.createdAt,
		updatedAt: tweet.updatedAt,
    authorId: tweet.authorId,
    replyToId: tweet.replyToId,
    author: !!tweet.author ? userTransformer(tweet.author) : null,
    mediaFiles: !!tweet.mediaFiles ? tweet.mediaFiles.map(mediaFileTransformer) : [],
    replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
    repliesCount: !!tweet.replies ? tweet.replies.length : 0,
    postedAtHuman: moment(tweet.createdAt).fromNow()
  }
}

