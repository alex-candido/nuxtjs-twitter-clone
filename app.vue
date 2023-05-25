<script lang="ts" setup>
let darkMode = ref(false);
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-black">
      <!-- App -->
      <div v-if="false" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-10"
        >
          <!-- Left Sidebar -->

          <div class="md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <!-- Main Content -->

          <main class="col-span-12 marker:md:col-span-8 xl:col-span-6">
            <router-view />
          </main>

          <!-- Right Sidebar -->

          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <AuthPage v-else />
    </div>
  </div>
</template>
