const useTweets = () => {

  const usePostTweet = () => useState<{ id: string, text: string }>('post_tweet')

  const setPost = ( newPost: any) => {
    const postTweet = usePostTweet()
    postTweet.value = newPost;
  }

  const postTweet = (formData: { text: string, mediaFiles: Array<any> }) => {
    return new Promise(async (resolve, reject) => {
      const form = new FormData()

      form.append('text', formData.text)

      try {
        const request = await useFetch('/api/user/tweets', {
          method: 'POST',
          body: form
        })

        setPost(request.data.value?.tweet)
        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  return {
    postTweet,
    usePostTweet
  }
}

export default useTweets;
