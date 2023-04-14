<script setup lang="ts">
const { defaultTransition } = useTailwindConfig();

</script>

<template>
  <div class="flex flex-col h-screen">
    <div
      class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20"
      :class="defaultTransition"
    >
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
          <font-awesome-icon icon="fa-solid fa-house" />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab active>
        <template v-slot:icon>
          <font-awesome-icon icon="fa-solid fa-hashtag" />
        </template>
        <template v-slot:name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab active>
        <template v-slot:icon>
          <font-awesome-icon icon="fa-solid fa-bell" />
        </template>
        <template v-slot:name> Notifications </template>
      </SidebarLeftTab>

      <SidebarLeftTab active>
        <template v-slot:icon>
          <font-awesome-icon icon="fa-solid fa-inbox" />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarLeftTab>

      <SidebarLeftTab active>
        <template v-slot:icon>
          <font-awesome-icon icon="fa-solid fa-bookmark" />
        </template>
        <template v-slot:name> Bookmarks </template>
      </SidebarLeftTab>

      <SidebarLeftTab active>
        <template v-slot:icon>
          <font-awesome-icon icon="fa-solid fa-file-lines" />
        </template>
        <template v-slot:name> Lists </template>
      </SidebarLeftTab>

      <SidebarLeftTab active>
        <template v-slot:icon>
          <font-awesome-icon icon="fa-solid fa-user" />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>

      <SidebarLeftTab active>
        <template v-slot:icon>
          <font-awesome-icon icon="fa-solid fa-ellipsis" class="text-xl"/>
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>
    </div>
  </div>
</template>
