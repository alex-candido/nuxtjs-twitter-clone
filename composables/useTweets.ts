const useTweets = () => {
  const postTweet = (formData: any) => {
    return new Promise(async (resolve, reject) => {
      const form = new FormData()

      form.append('text', formData.text)

      try {
        const request = await useFetch('/api/user/tweets', {
          method: 'POST',
          body: form
        })

        resolve(true)
        return request
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  return {
    postTweet
  }
}

export default useTweets;
