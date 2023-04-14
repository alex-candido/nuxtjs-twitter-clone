<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }        
    })

</script>

<template>
    <div>

        <h2>{{ props.title }}</h2>

        <slot></slot>
    </div>
</template>
