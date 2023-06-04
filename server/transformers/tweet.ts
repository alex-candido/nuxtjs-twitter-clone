interface tweetDataProps {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  replyToId: string | null;
}

export const tweetTransformer = (tweet: tweetDataProps) => {
  return {
    id: tweet.id,
    text: tweet.text,
  }
}

