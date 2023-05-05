<script setup lang="ts">
import { computed } from 'vue';
import { useUserInterfaceStore } from '../../../stores/UserInterfaceStore';
import { Memo } from '../../../types';
import MemoItem from './MemoItem.vue';

// pinia
const uiStore = useUserInterfaceStore();

// props
const BoardProps = defineProps<{ isDark: boolean; displayedMemos: Memo[] | null | undefined; category: string }>();

// emits
const emit = defineEmits(['update:category']);

const computedCategory = computed({
  get: () => BoardProps.category,
  set: (value) => {
    emit('update:category', value);
  },
});
</script>

<template>
  <div class="w-full mt-6 md:text-[16px] text-[14px]">
    <div class="flex justify-between items-center">
      <h3 class="p-2 text-2xl font-semibold text-cyan-900" :class="isDark && `!text-cyan-600`">Memos</h3>
      <select
        name="category"
        class="p-2 border text-[16px] h-fit rounded cursor-pointer mr-1"
        :class="isDark ? `text-cyan-600 border-cyan-600 bg-gray-800` : `text-cyan-900 border-cyan-900`"
        v-model="computedCategory"
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
      <MemoItem v-if="BoardProps.displayedMemos?.length" v-for="memo in BoardProps.displayedMemos" :memo="memo" :key="memo.title" />
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
</template>
