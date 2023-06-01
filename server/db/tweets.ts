import { prisma } from ".";

export const createTweet = (tweetData: any) => {
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
