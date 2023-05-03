<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';

// components
import Header from '../common/Header.vue';
import Footer from '../common/Footer.vue';
import MiniMenu from '../common/MiniMenu.vue';
import Controller from './partials/Controller.vue';
import Board from './partials/Board.vue';
import RegisterModal from './partials/RegisterModal.vue';

// pinia
import { useUserInterfaceStore } from '../../stores/UserInterfaceStore';
import { useMemoStore } from '../../stores/MemoStore';
import { storeToRefs } from 'pinia';
import { Memo } from '../../types';

// import MemoItem from './components/partials/MemoItem.vue';
const uiStore = useUserInterfaceStore();
const { isDark, isOpen, registerModalIsShowed, body } = storeToRefs(uiStore);
const memoStore = useMemoStore();
const { memos, now } = storeToRefs(memoStore);

// functions
const displayedMemos = ref<Memo[] | null | undefined>();
const category = ref<string>('all');

const init = () => {
  memos.value = JSON.parse(localStorage.getItem('memos')!) || [];
  isDark.value = JSON.parse(localStorage.getItem('isDark')!) || false;
  category.value = JSON.parse(localStorage.getItem('category')!) || 'all';

  if (isDark.value) document.body.classList.add('bg-gray-800');
  else document.body.classList.remove('bg-gray-800');

  setTimeout(() => {
    body.value!.classList.add('duration-500');
  }, 100);
};

const filterMemos = (type: string) => {
  if (type === 'all') {
    displayedMemos.value = memos.value;
    return;
  }
  const filteredMemos = memos.value?.filter((memo) => memo.category === type);
  displayedMemos.value = filteredMemos;
};

onMounted(() => {
  init();
});

// watchers
watch(
  memos,
  (newVal) => {
    localStorage.setItem('memos', JSON.stringify(newVal));
    filterMemos(category.value);
  },
  { deep: true }
);

watch(category, (newVal) => {
  localStorage.setItem('category', JSON.stringify(newVal));
  filterMemos(newVal);
});

watch(isDark, (newVal) => {
  localStorage.setItem('isDark', JSON.stringify(newVal));
});
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
    <Board :isDark="isDark" :displayedMemos="displayedMemos" v-model:category="category" />
    <!-- content -->
  </main>
  <!-- bottom -->
  <Footer :isDark="isDark" :now="now" />
  <!-- bottom -->
</template>
