<script setup lang="ts">
import { ref } from 'vue';
import ActionButton from '../../common/ActionButton.vue';
import ErrorMessage from '../../utils/ErrorMessage.vue';

import { useUserInterfaceStore } from '../../../stores/UserInterfaceStore';
import { useMemoStore } from '../../../stores/MemoStore';
import { storeToRefs } from 'pinia';

import { updateMemo } from '../../../api/functions';

// pinia
const uiStore = useUserInterfaceStore();
const { isDark } = storeToRefs(uiStore);
const memoStore = useMemoStore();

// props
const props = defineProps<{
  id: string;
  title: string;
  content: string;
  category: string;
  link: string | undefined;
}>();

// functions
const title = ref<string>(props.title!);
const content = ref<string>(props.content!);
const category = ref<string>(props.category!);
const link = ref<string>(props.link!);
const preventEditLink = ref<boolean>(false);
const preventUpdate = ref<boolean>(false);

const emits = defineEmits(['on-click']);
const handleEditModal = () => {
  emits('on-click');
};

const allowEditLink = () => {
  preventEditLink.value = !preventEditLink.value;
};

const checkContent = () => {
  const isInputContent = title.value.trim() !== '' && content.value.trim() !== '';
  return isInputContent ? false : true;
};

const handleEdit = () => {
  preventUpdate.value = checkContent();
  if (preventUpdate.value) return;

  const data = { title: title.value, content: content.value, category: category.value, link: link.value };
  // api
  updateMemo(props.id, data);

  // state for UI
  memoStore.updateFn({ id: props.id, ...data });
  handleEditModal();
};
</script>

<template>
  <div class="max-w-[600px] md:w-full w-[90%] h-screen rounded-l-md p-6 fixed top-0 right-0 z-20 animate-slide-in" :class="isDark ? `bg-gray-800` : `bg-white `">
    <div>
      <h2 class="font-bold text-2xl" :class="isDark ? `text-cyan-500` : `text-cyan-900`">Detail</h2>
      <!-- error message -->
      <ErrorMessage v-show="preventUpdate" :msg="`Error! In order to update, you should type the title or content.`" />
      <div class="mt-4 flex items-center border border-gray-400 text-[16px] rounded" :class="isDark && `text-gray-300`">
        <span class="px-4 py-2 bg-gray-200 font-bold rounded-l" :class="isDark && `bg-gray-700`">title</span>
        <input type="text" class="p-2 flex-[1] rounded-r" :class="isDark && `bg-gray-800`" v-model="title" />
      </div>
      <div class="w-full mt-2 text-[16px]" :class="isDark && `text-gray-300`">
        <textarea
          class="w-full md:h-[200px] h-[300px] px-4 py-2 border border-gray-400 rounded"
          :class="isDark && `bg-gray-800`"
          v-model="content"
          placeholder="content"
        ></textarea>
      </div>
      <div class="mt-2 flex items-center gap-3">
        <span class="font-semibold" :class="isDark ? `text-white` : `text-dark`">Category</span>
        <select
          name="category"
          class="p-2 border text-[16px] h-fit rounded cursor-pointer"
          :class="isDark ? `text-cyan-600 border-cyan-600 bg-gray-800` : `text-cyan-900 border-cyan-900`"
          v-model="category"
        >
          <option value="study" selected>study</option>
          <option value="hobby">hobby</option>
          <option value="work">work</option>
          <option value="others">others</option>
        </select>
      </div>
      <div class="flex items-center gap-2 mt-3" v-if="props.link && !preventEditLink" :class="isDark && 'text-white'">
        <a
          :href="link"
          class="w-full flex items-center gap-2 border-[1px] border-gray-400 rounded-3xl px-2 py-1 whitespace-nowrap overflow-hidden"
          :class="isDark && `bg-gray-700`"
          :title="link"
        >
          <font-awesome-icon :icon="['fas', 'link']" />
          {{ link }}
        </a>
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="w-5 h-5 cursor-pointer" @click="allowEditLink" />
      </div>
      <div class="flex items-center gap-2 text-[16px] mt-3" :class="isDark && `text-gray-300`" v-else>
        <font-awesome-icon :icon="['fas', 'link']" />
        <input type="text" class="w-full p-1 border border-gray-400 rounded" :class="isDark && `bg-gray-800`" v-model="link" placeholder="add link" />
      </div>
      <div class="mt-6 ml-auto flex gap-2 w-fit">
        <ActionButton :btn-color="isDark ? `bg-gray-400` : `bg-gray-500`" @on-click="handleEditModal">Cancel</ActionButton>
        <ActionButton :btn-color="isDark ? `bg-blue-400` : `bg-blue-900`" @on-click="handleEdit">Update</ActionButton>
      </div>
    </div>
  </div>
  <div class="w-screen fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#07070750]" :class="isDark && `bg-[#70707050]`" @click="handleEditModal" />
</template>
