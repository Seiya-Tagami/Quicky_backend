<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Home from './Home.vue';

// pinia
import { useUserInterfaceStore } from '../../stores/UserInterfaceStore';
import { useMemoStore } from '../../stores/MemoStore';
import { storeToRefs } from 'pinia';

const uiStore = useUserInterfaceStore();
const { isDark, body } = storeToRefs(uiStore);
const memoStore = useMemoStore();
const { memos } = storeToRefs(memoStore);

const category = ref<string>('all');

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:3000/memos/');
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const initialize = () => {
  /**
   *  DBとローカルストレージからデータを引っ張る
   */
  fetchData();
  memos.value = JSON.parse(localStorage.getItem('memos')!) || [];
  isDark.value = JSON.parse(localStorage.getItem('isDark')!) || false;
  category.value = JSON.parse(localStorage.getItem('category')!) || 'all';

  /**
   *  themeの調整処理
   */
  if (isDark.value) document.body.classList.add('bg-gray-800');
  else document.body.classList.remove('bg-gray-800');
  setTimeout(() => {
    body.value!.classList.add('duration-500');
  }, 100);
};

// onMounted(() => {
//   initialize()
// });
</script>
<template>
  <Home />
</template>
