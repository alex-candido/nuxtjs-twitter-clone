<script setup lang="ts">
  const text = ref('')

  const emits = defineEmits<{
  (e: 'onSubmit', value: { text: string, mediaFiles: Array<any> }): void;
  }>();

  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  function handleFormSubmit(event: Event) {
    const newValue = {
        text: text.value,
        mediaFiles: []
    }
    emits("onSubmit", newValue);
  }

</script>

<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full" />
      </div>

      <div class="w-full p-2">
        <textarea
          v-model="text"
          class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:tex.white focus:ring-0"
        ></textarea>
      </div>
    </div>

    <!-- File Selector -->

    <div class="p-4 pl-16">

      <div class="flex w-full text-white"></div>

      <div class="ml-auto"></div>

    </div>

    <!-- Icons -->

    <div class="flex p-2 pl-14">
      <div class="flex w-full text-white">
        <div
          class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800"
        ></div>
      </div>
      <div class="ml-auto">
        <UIButton size="sm" @onClick="handleFormSubmit" >
          <span class="font-bold">
            Tweet
          </span>
        </UIButton>
      </div>
    </div>

  </div>
</template>
