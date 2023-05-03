<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';

// components
import RegisterModal from './components/Home/partials/RegisterModal.vue';

// pinia
import { useUserInterfaceStore } from './stores/UserInterfaceStore';
import { useMemoStore } from './stores/MemoStore';
import { storeToRefs } from 'pinia';
import { Memo } from './types';
import MemoItem from './components/MemoItem.vue';
import Header from './components/common/Header.vue';
import Footer from './components/common/Footer.vue';
import MiniMenu from './components/common/MiniMenu.vue';
import Controller from './components/Home/partials/Controller.vue';
import Board from './components/Home/partials/Board.vue';
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
    <!-- <Board :isDark="isDark" :displayedMemos="displayedMemos" :category="category" /> -->
    <div class="w-full mt-6 md:text-[16px] text-[14px]">
      <div class="flex justify-between items-center">
        <h3 class="p-2 text-2xl font-semibold text-cyan-900" :class="isDark && `!text-cyan-600`">Memos</h3>
        <select
          name="category"
          class="p-2 border text-[16px] h-fit rounded cursor-pointer mr-1"
          :class="isDark ? `text-cyan-600 border-cyan-600 bg-gray-800` : `text-cyan-900 border-cyan-900`"
          v-model="category"
        >
          <option value="all" selected>all</option>
          <option value="study">study</option>
          <option value="hobby">hobby</option>
          <option value="work">work</option>
          <option value="others">others</option>
        </select>
      </div>
      <div class="w-full flex px-3 items-center justify-around border-b-2 border-cyan-900" :class="isDark && `!border-cyan-600`" />
      <div class="min-h-[400px] flex flex-col gap-2 mt-4 md:p-2 md:overflow-y-auto md:scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-700">
        <MemoItem v-if="displayedMemos?.length" v-for="memo in displayedMemos" :memo="memo" :key="memo.id" />
        <div v-else class="mx-auto mt-6 flex gap-2 font-semibold" :class="isDark && `text-white`">
          <p class="md:text-3xl text-2xl italic">Let's register a new memo...</p>
          <font-awesome-icon
            :icon="['fas', 'pen']"
            class="md:w-[40px] md:h-[40px] w-[30px] h-[30px] cursor-pointer select-none hover:-translate-y-1 duration-200"
            @click="uiStore.handleRegisterModal"
          />
        </div>
      </div>
    </div>
  </main>
  <!-- bottom -->
  <Footer :isDark="isDark" :now="now" />
  <!-- bottom -->
</template>
