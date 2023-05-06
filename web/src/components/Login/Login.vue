<script setup lang="ts">
import Title from '../common/Title.vue';
import LoginForm from './partials/LoginForm.vue';
import Footer from '../common/Footer.vue';
import MiniMenu from '../common/MiniMenu.vue';

import { useUserInterfaceStore } from '../../stores/UserInterfaceStore';
import { useMemoStore } from '../../stores/MemoStore';
import { storeToRefs } from 'pinia';

// pinia
const uiStore = useUserInterfaceStore();
const { isDark, isOpen, registerModalIsShowed } = storeToRefs(uiStore);
const memoStore = useMemoStore();
const { displayedMemos, now, globalCategory } = storeToRefs(memoStore);
</script>

<template>
  <main class="max-w-[1200px] mx-auto pt-[60px] px-4">
    <!-- top -->
    <MiniMenu :isDark="isDark" :isOpen="isOpen" />
    <Title :isDark="isDark" />
    <!-- top -->

    <!-- content -->
    <LoginForm />
    <!-- content -->
  </main>
  <!-- bottom -->
  <Footer :isDark="isDark" />
  <!-- bottom -->
</template>
