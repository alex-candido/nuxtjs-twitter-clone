import { prisma } from ".";

interface tweetDataProps {
  text: any;
  authorId: any;
}
export const createTweet = (tweetData: tweetDataProps) => {
  return prisma.tweet.create({
    data: tweetData
  })
}

export const getTweets = (params: {}) => {
  return prisma.tweet.findMany({
    ...params
  })
}

export const getTweetById = (tweetId: any, params: any = {}) => {
    return prisma.tweet.findUnique({
        ...params,
        where: {
            ...params.where,
            id: tweetId
        },
    })
}
