<script setup lang="ts">
import MenuToggleButton from './MenuToggleButton.vue';
import MiniModal from './MiniModal.vue';

//pinia
import { useUserInterfaceStore } from '../../stores/UserInterfaceStore';
const uiStore = useUserInterfaceStore();

// props
const MiniMenuProps = defineProps<{ isDark: boolean; isOpen: boolean }>();
</script>

<template>
  <div>
    <MenuToggleButton @open-menu="uiStore.handleMenu" :isDark="MiniMenuProps.isDark" :isOpen="MiniMenuProps.isOpen" />
    <MiniModal v-show="isOpen" @on-click="uiStore.changeTheme" :isDark="MiniMenuProps.isDark" />
  </div>
</template>
