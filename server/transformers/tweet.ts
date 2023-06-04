interface tweetDataProps {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  replyToId: boolean | null;
}

export const tweetTransformer = (tweet: tweetDataProps) => {
  return {
    id: tweet.id,
    text: tweet.text,
  }
}

