<script setup lang="ts">
// props
const MenuToggleButtonProps = defineProps({
  isDark: Boolean,
  isOpen: Boolean,
});

// functions
const emits = defineEmits(['open-menu']);
const onClick = () => {
  emits('open-menu');
};
</script>

<template>
  <div class="w-[100px] h-[100px] rounded-bl-full absolute top-0 right-0 select-none" :class="MenuToggleButtonProps.isDark ? `bg-cyan-600` : `bg-cyan-900 `">
    <div class="relative">
      <button class="absolute top-7 right-7" @click="onClick">
        <font-awesome-icon v-if="isOpen" :icon="['fas', 'xmark']" class="text-3xl text-white" />
        <font-awesome-icon v-else :icon="['fas', 'ellipsis']" class="text-3xl text-white" />
      </button>
    </div>
  </div>
</template>
