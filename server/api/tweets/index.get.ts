import { getTweets } from "~~/server/db/tweets";
// import { tweetTransformer } from "~~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event)

  let prismaQuery = {
		include: {
			author: true,
			mediaFiles: true,
			replies: { include: { author: true } },
			replyTo: { include: { author: true } },
		},
		orderBy: [{ createdAt: 'desc' }],
	};

	if (!!query) {
		prismaQuery = {
			...prismaQuery,
			// where: { text: { contains: query } },
		};
	}

  const tweets = await getTweets(prismaQuery)

  return {
    tweets: tweets
  }
})
