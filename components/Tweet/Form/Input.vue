<script setup lang="ts">

const imageInput = ref()
const selectedFile = ref()
const inputImageUrl = ref(<string | ArrayBuffer | null | undefined>null)
const text = ref('')

const emits = defineEmits<{
  (e: 'onSubmit', value: { text: string; mediaFiles: Array<any> }): void
}>()

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

function handleFormSubmit() {
  const newValue = {
    text: text.value,
    mediaFiles: [],
  }
  emits('onSubmit', newValue)
}

function handleImagClick() {
  imageInput.value.click()
}

function handleImageChange(event: Event) {
  const target = (event.target as HTMLInputElement).files
  const files = target?.item(0) as Blob

  selectedFile.value = files

  const reader = new FileReader()

  reader.onload = (event) => {
    inputImageUrl.value = event.target?.result
  }

  reader.readAsDataURL(files)
}

</script>

<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img
          :src="props.user?.profileImage"
          alt=""
          class="inline-block w-10 h-10 rounded-full"
        />
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
      <img alt="" class="border rounded-2xl" >

      <input type="file" ref="imageInput" hidden accept="image/png, image/gif, image/jpeg" @change="handleImageChange">
    </div>

    <!-- Icons -->

    <div class="flex p-2 pl-14">
      <div class="flex w-full text-white">
        <div class="flex w-full text-white">
          <div
            class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800"
            @click="handleImagClick"
          >
            <IconsImage />
          </div>

          <div
            class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800"
          >
            <IconsGif />
          </div>

          <div class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800">
            <IconsColumn />
          </div>

          <div class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800">
            <IconsSmile />
          </div>

          <div class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800">
            <IconsCalendar />
          </div>
        </div>
      </div>

      <div class="ml-auto">
        <UIButton size="sm" @onClick="handleFormSubmit">
          <span class="font-bold"> Tweet </span>
        </UIButton>
      </div>
    </div>
  </div>
</template>
