import { tweetDataProps } from "~/@types/transformers"

const useTweets = () => {
  const usePostTweet = () => useState<{ id: string, text: string }>('post_tweet')
  const getPostTweets = () => useState<tweetDataProps[] | undefined >('get_tweets')

  const setPost = ( newPost: any) => {
    const postTweet = usePostTweet()
    postTweet.value = newPost;
  }

  const setPostTweets = ( tweets: tweetDataProps[] | undefined) => {
    const currentTweets = getPostTweets()
    currentTweets.value = tweets;
  }

  const postTweet = (formData: { text: string, mediaFiles: Array<any>, replyTo: any }) => {
    return new Promise(async (resolve, reject) => {
      const form = new FormData()

      form.append('text', formData.text)
      form.append('replyTo', formData.replyTo)

      formData.mediaFiles.forEach((mediaFile, index) => {
        form.append('media_file_' + index, mediaFile)
      })

      try {
        const request: any = await useFetch('/api/user/tweets', {
          method: 'POST',
          body: {
            form
          }
        })

        setPost(request.data.value?.tweet)
        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  const getTweets = (params = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = await useFetch('/api/tweets', {
          method: 'GET',
          query: params
        })

        setPostTweets(request.data.value?.tweets)
        resolve(request)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  return {
    postTweet,
    getTweets,
    usePostTweet,
    getPostTweets
  }
}

export default useTweets;
