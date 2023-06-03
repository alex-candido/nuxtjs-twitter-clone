<script setup lang="ts"></script>

<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img class="inline-block w-10 h-10 rounded-full" />
      </div>

      <div class="w-full p-2">
        <textarea
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
    </div>
  </div>
</template>
