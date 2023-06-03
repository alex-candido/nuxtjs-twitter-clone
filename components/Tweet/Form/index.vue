<script setup lang="ts">
  const loading = ref(false)
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  function handleFormSubmit(data: any) {
    console.log(data)
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
