<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Home from './Home.vue';

// pinia
import { useUserInterfaceStore } from '../../stores/UserInterfaceStore';
import { useMemoStore } from '../../stores/MemoStore';
import { storeToRefs } from 'pinia';

const uiStore = useUserInterfaceStore();
const { isDark, body } = storeToRefs(uiStore);
const memoStore = useMemoStore();
const { memos, displayedMemos, globalCategory } = storeToRefs(memoStore);

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:3000/memos/');
    memos.value = res.data;
    console.log(memos.value);
  } catch (error) {
    console.log(error);
  }
};

const initialize = () => {
  /**
   *  DBとローカルストレージからデータを引っ張る
   */
  fetchData();
  isDark.value = JSON.parse(localStorage.getItem('isDark')!) || false;
  globalCategory.value = JSON.parse(localStorage.getItem('category')!) || 'all';

  /**
   *  themeの調整処理
   */
  if (isDark.value) document.body.classList.add('bg-gray-800');
  else document.body.classList.remove('bg-gray-800');
  setTimeout(() => {
    body.value!.classList.add('duration-500');
  }, 100);
};

onMounted(() => {
  initialize();
});

const filterMemos = (type: string) => {
  if (type === 'all') {
    displayedMemos.value = memos.value;
    return;
  }
  const filteredMemos = memos.value?.filter((memo) => memo.category === type);
  displayedMemos.value = filteredMemos;
};

// watchers
watch(
  memos,
  (newVal) => {
    localStorage.setItem('memos', JSON.stringify(newVal));
    filterMemos(globalCategory.value);
  },
  { deep: true }
);

// カテゴリーの監視
watch(globalCategory, (newVal) => {
  localStorage.setItem('category', JSON.stringify(newVal));
  filterMemos(newVal);
});

// ダークモードの監視
watch(isDark, (newVal) => {
  localStorage.setItem('isDark', JSON.stringify(newVal));
});
</script>
<template>
  <Home />
</template>
