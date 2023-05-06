<script setup lang="ts">
const FooterProps = defineProps<{ isDark: boolean }>();
</script>
<template>
  <footer class="w-full h-[60px] text-center text-[18px] mt-10" :class="FooterProps.isDark && `text-white`">
    <small class="leading-[60px]">&copy; {{ new Date().getFullYear() }} SeiyaCode</small>
  </footer>
</template>
