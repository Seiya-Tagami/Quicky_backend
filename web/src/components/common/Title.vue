<script setup lang="ts">
const HeaderProps = defineProps<{ isDark: boolean }>();
</script>
<template>
  <h1 class="text-4xl font-extrabold text-cyan-900" :class="HeaderProps.isDark && `!text-cyan-600`">
    Simple Memo <span class="text-xl italic">{{ new Date().getFullYear() }}</span>
  </h1>
  <p class="text-[18px] mt-2 text-gray-400" :class="HeaderProps.isDark && `!text-gray-300`">Make your life better.</p>
</template>
