<script setup lang="ts">
  const loading = ref(false)
  const { postTweet } = useTweets()
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  async function handleFormSubmit(data: any) {
    console.log(data)
    try {
      const response = await postTweet({
        text: data.text
      })

      console.log(response)
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
