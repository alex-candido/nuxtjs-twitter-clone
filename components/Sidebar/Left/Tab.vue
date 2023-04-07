<script setup lang="ts">
const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal",
);
</script>

<template>
  <nuxt-link
    to="#"
    class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white"
  >
    <div class="w-6 h-6 text-center text-dark" :class="defaultTransition">
      <slot name="icon" />
    </div>

    <div class=" ml-4 text-xl xl:block" :class="textClasses">
      <slot name="name" />
    </div>
  </nuxt-link>
</template>
