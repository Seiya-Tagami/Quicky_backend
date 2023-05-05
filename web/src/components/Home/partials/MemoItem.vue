<script setup lang="ts">
import { ref } from 'vue';
import EditModal from './EditModal.vue';
import { Memo } from '../../../types';
import { formatDate } from '../../utils/functions';

import { updateIsDone } from '../../../api/functions';

import { useUserInterfaceStore } from '../../../stores/UserInterfaceStore';
import { useMemoStore } from '../../../stores/MemoStore';
import { storeToRefs } from 'pinia';

// pinia
const uiStore = useUserInterfaceStore();
const { isDark, isOpen } = storeToRefs(uiStore);
const memoStore = useMemoStore();
const { memos } = storeToRefs(memoStore);

// props
const MemoItemProps = defineProps<{ memo: Memo }>();

// functions
const handleMemo = () => {
  const targetMemo = memos.value?.find((memo) => memo.id === MemoItemProps.memo.id);
  // api
  if (!targetMemo?.isDone) {
    updateIsDone(MemoItemProps.memo.id, 'isdone');
  } else {
    updateIsDone(MemoItemProps.memo.id, 'isnotdone');
  }
  // state for UI
  memoStore.handleFn(MemoItemProps.memo.id);
};

const editModalIsShowed = ref<boolean>(false);
const handleEditModal = () => {
  editModalIsShowed.value = !editModalIsShowed.value;
  isOpen.value = false;
};
</script>

<template>
  <div
    class="w-full flex items-center justify-around p-3 md:border-l-[5px] border-l-[6px] rounded-md duration-300"
    :class="[MemoItemProps.memo!.isDone && `${isDark ? `!border-green-400` : `!border-green-600`}`, isDark ? `bg-gray-700 border-blue-400` : `bg-white border-blue-900`]"
  >
    <input type="checkbox" @change="handleMemo" :checked="MemoItemProps.memo?.isDone" class="w-8 h-4 cursor-pointer" />
    <div class="max-w-[480px] w-full flex md:justify-between md:flex-row flex-col ml-[36px]">
      <span class="w-fit font-semibold relative text-[18px] duration-300" :class="[isDark ? `text-white` : `text-cyan-900`, MemoItemProps.memo!.isDone && `!text-gray-300`]">
        {{ MemoItemProps.memo?.title.substring(0, 15) }}<span class="text-gray-400">{{ MemoItemProps.memo?.title.length > 15 ? '...' : '' }}</span>
        <div class="absolute w-[150%] h-[2px] top-1/2 left-1/2 -translate-x-1/2" :class="isDark ? `bg-blue-400` : `bg-cyan-900`" v-show="MemoItemProps.memo?.isDone" />
      </span>
      <div class="flex gap-2 duration-300" :class="[isDark ? `text-violet-300` : `text-gray-500`,MemoItemProps.memo!.isDone && `${isDark ? `!text-gray-400` : `!text-gray-300`}`]">
        <span>{{ !MemoItemProps.memo?.updatedAt ? 'created at' : 'updated at' }}</span>
        <span class="font-semibold">{{ !MemoItemProps.memo?.updatedAt ? formatDate(MemoItemProps.memo?.createdAt) : formatDate(MemoItemProps.memo?.updatedAt) }}</span>
        <span
          class="px-2 ml-6 text-black font-semibold rounded-xl"
          :class="
            MemoItemProps.memo?.category === 'study'
              ? 'bg-green-200'
              : MemoItemProps.memo?.category === 'hobby'
              ? 'bg-purple-200'
              : MemoItemProps.memo?.category === 'work'
              ? 'bg-blue-200'
              : 'bg-yellow-200'
          "
          >{{ MemoItemProps.memo?.category && MemoItemProps.memo.category }}</span
        >
      </div>
    </div>
    <button class="md:p-3 p-2 font-semibold rounded w-fit text-white select-none" :class="isDark ? `bg-blue-400` : `bg-blue-900`" @click="handleEditModal">Detail</button>
  </div>
  <EditModal
    v-if="editModalIsShowed"
    :id="MemoItemProps.memo!.id"
    :title="MemoItemProps.memo!.title"
    :content="MemoItemProps.memo!.content"
    :category="MemoItemProps.memo!.category"
    :link="MemoItemProps.memo?.link"
    @on-click="handleEditModal"
  />
</template>
