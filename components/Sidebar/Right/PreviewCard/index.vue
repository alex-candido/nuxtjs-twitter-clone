<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const { twitterBorderColor, defaultTransition } = useTailwindConfig();
</script>

<template>
  <div
    class="m-2 border rounded-2xl bg-gray-50 dark:bg-dim-700 overflow-hidden"
    :class="twitterBorderColor"
  >
    <h1
      class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white"
    >
      {{ props.title }}
    </h1>

    <slot></slot>

    <div
      class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
      :class="defaultTransition"
    >
      show more
    </div>
  </div>
</template>
