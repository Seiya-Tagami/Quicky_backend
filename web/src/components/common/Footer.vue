<script setup lang="ts">
const FooterProps = defineProps<{ isDark: boolean; now: Date }>();
</script>
<template>
  <footer class="w-full h-[60px] text-center text-[18px] mt-10" :class="isDark && `text-white`">
    <small class="leading-[60px]">&copy; {{ now.getFullYear() }} SeiyaCode</small>
  </footer>
</template>
