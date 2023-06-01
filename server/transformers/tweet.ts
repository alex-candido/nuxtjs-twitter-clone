export const tweetTransformer = (tweet: any) => {
  return {
    id: tweet.id,
    text: tweet.text,
  }
}

