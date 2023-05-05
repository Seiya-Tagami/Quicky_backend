<script setup lang="ts">
// components
import Header from '../common/Header.vue';
import Footer from '../common/Footer.vue';
import MiniMenu from '../common/MiniMenu.vue';
import Controller from './partials/Controller.vue';
import Board from './partials/Board.vue';
import RegisterModal from './partials/RegisterModal.vue';

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
    <Header :isDark="isDark" :now="now" />
    <Controller :isDark="isDark" />
    <!-- top -->

    <!-- content -->
    <RegisterModal v-if="registerModalIsShowed" />
    <Board :isDark="isDark" :displayedMemos="displayedMemos" v-model:category="globalCategory" />
    <!-- content -->
  </main>
  <!-- bottom -->
  <Footer :isDark="isDark" :now="now" />
  <!-- bottom -->
</template>
