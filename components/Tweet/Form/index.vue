<script setup lang="ts">
const loading = ref(false)

</script>

<template>
  <div>
    <div  v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else >
      <TweetItem />
      <TweetFormInput />
    </div>
  </div>
</template>
