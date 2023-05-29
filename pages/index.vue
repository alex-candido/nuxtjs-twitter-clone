<script setup lang="ts">
    const loading = ref(false)
    const { useAuthUser } = useAuth()
    const user = useAuthUser()

</script>

<template>
    <div>
        <MainSection title="Home" :loading="loading">
          <Head>
              <Title>Home / Twitter</Title>
          </Head>

        </MainSection>
    </div>
</template>
