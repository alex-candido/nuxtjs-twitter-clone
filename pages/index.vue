<script setup lang="ts">
  const loading = ref(false)
  const { useAuthUser } = useAuth()
  const user: Record<string, any> = useAuthUser()

</script>

<template>
    <div>
        <MainSection title="Home" :loading="loading">
          <Head>
            <Title>Home / Twitter</Title>
          </Head>

          <div class="border-b">
            <TweetForm :user="user"/>
          </div>

        </MainSection>
    </div>
</template>
