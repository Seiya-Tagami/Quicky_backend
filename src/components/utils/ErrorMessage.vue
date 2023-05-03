<script setup lang="ts">
const props = defineProps<{ msg: string }>();
</script>

<template>
  <div class="mt-2 -mb-2 flex items-center gap-2 bg-yellow-100 p-2 rounded-md font-semibold text-yellow-600">
    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
    <span>{{ props.msg }}</span>
  </div>
</template>
