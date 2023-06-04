<script setup lang="ts">
const loading = ref(false)
const { postTweet, usePostTweet } = useTweets()
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    default: "What's happening ?",
  },
  replyTo: {
    type: Object,
    default: null,
  },
  showReply: {
    type: Boolean,
    default: false,
  },
})

const currentPostTweet = usePostTweet()

async function handleFormSubmit(data: {
  text: string
  mediaFiles: Array<any>
}) {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    })

    console.log(currentPostTweet.value)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetItem
        :tweet="props.replyTo"
        v-if="props.replyTo && props.showReply"
        hideActions
      />
      <TweetFormInput
        :placeholder="props.placeholder"
        :user="props.user"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>
