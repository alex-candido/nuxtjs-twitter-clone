<script setup lang="ts">
import { tweetDataProps } from '~/@types/transformers';

  const { twitterBorderColor } = useTailwindConfig()
  const { getTweets, getPostTweets } = useTweets()

  const loading = ref(false)
  const homeTweets = ref(<tweetDataProps[] | undefined>[])
  const { useAuthUser } = useAuth()

  const user: Record<string, any> = useAuthUser()

  const currentGetPostTweets = getPostTweets()

  onBeforeMount(async () => {
    loading.value = true

    try {
      await getTweets()

      console.log(currentGetPostTweets.value)
      homeTweets.value = currentGetPostTweets.value
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
  })

</script>

<template>
    <div>
        <MainSection title="Home" :loading="loading">
          <Head>
            <Title>Home / Twitter</Title>
          </Head>

          <div class="border-b" :class="twitterBorderColor">
            <TweetForm :user="user"/>
          </div>

          <TweetListFeed :tweets="homeTweets" />

        </MainSection>
    </div>
</template>
