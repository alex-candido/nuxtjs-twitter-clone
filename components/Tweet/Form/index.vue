<script setup lang="ts">
  const loading = ref(false)
  const { postTweet, usePostTweet } = useTweets()
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  const currentPostTweet = usePostTweet();

  async function handleFormSubmit(data: { text: string, mediaFiles: Array<any> }) {
    console.log(data)
    try {
      const response = await postTweet({
        text: data.text,
        mediaFiles: data.mediaFiles,
      })

      console.log(currentPostTweet.value)
    } catch (error) {
      console.log(error)
    }
  }

</script>

<template>
  <div>
    <div  v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else >
      <TweetItem />
      <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit"/>
    </div>
  </div>
</template>
