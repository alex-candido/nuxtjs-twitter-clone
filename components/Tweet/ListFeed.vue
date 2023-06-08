<script setup lang="ts">
import { tweetDataProps } from '~/@types/transformers';

const { twitterBorderColor, defaultTransition } = useTailwindConfig()

const props = defineProps({
  tweets: {
    type: Array as PropType<tweetDataProps[] | undefined>,
    required: true
  }
})

const isEmptyArray = computed(() => props.tweets?.length === 0)

function redirect(tweet: any) {
  navigateTo(`/status/${tweet?.id}`)
}

</script>

<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">
        No tweets 😢
      </p>
    </div>
    <div
      v-else
      class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
      :class="[twitterBorderColor, defaultTransition]"
      v-for="(tweet, index) in props.tweets"
      :key="index"
      @click.native="redirect(tweet)"
    >
    </div>
  </div>
</template>


