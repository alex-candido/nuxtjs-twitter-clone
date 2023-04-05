<script setup lang="ts">
const { defaultTransition } = useTailwindConfig();
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20" :class="defaultTransition">
      <nuxt-link to="/">
        <div class="w-9 h-9">
          <font-awesome-icon
            class="text-4xl text-sky-500"
            icon="fa-brands fa-twitter"
          />
        </div>
      </nuxt-link>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
      <template v-slot:icon>
        <font-awesome-icon class="text-2xl" icon="fa-solid fa-house" />
      </template>
      <template v-slot:name>
        Home
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <font-awesome-icon class="text-2xl" icon="fa-solid fa-house" />
      </template>
      <template v-slot:name>
        Home
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <font-awesome-icon class="text-2xl" icon="fa-solid fa-house" />
      </template>
      <template v-slot:name>
        Home
      </template>
    </SidebarLeftTab>
    </div>
  </div>
</template>
