<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  isDark: Boolean,
});

const isSpin = ref<boolean>(false);
const emits = defineEmits(['on-click']);
const onClick = () => {
  emits('on-click');
  isSpin.value = true;
  setTimeout(() => {
    isSpin.value = false;
  }, 2000);
};
</script>

<template>
  <div
    class="w-[200px] text-cyan-900 bg-gray-200 border-2 border-cyan-900 rounded-lg absolute right-[16px] animate-show-miniModal"
    :class="isDark && `!bg-gray-800 text-white border-cyan-600`"
  >
    <div class="w-full flex items-center pl-5 py-3 gap-3" :class="props.isDark && `!border-cyan-600`">
      <span class="font-semibold">Appearance</span>
      <button @click="onClick" :disabled="isSpin ? true : false" class="flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'circle-half-stroke']" class="text-2xl cursor-pointer" :class="isSpin && `fa-spin-pulse`" />
      </button>
    </div>
    <div class="flex items-center gap-3 pl-5 py-2 border-cyan-900 border-t-[2px]">
      <span class="font-semibold">Follow me!</span>
      <div class="flex items-center gap-3">
        <a href="https://github.com/Seiya-Tagami/Simple-Memo" :class="props.isDark && `w-7 h-7 rounded-lg bg-white flex items-center justify-center`">
          <img src="/github.png" alt="github" class="w-6 h-6" />
        </a>
        <a href="https://seiyacode.vercel.app/" :class="props.isDark && `w-7 h-7 rounded-lg bg-white flex items-center justify-center`">
          <img src="/developer.png" alt="developer" class="w-6 h-6" />
        </a>
      </div>
    </div>
    <div class="pl-5 py-3 border-cyan-900 border-t-[2px]">
      <router-link to="/login" class="font-semibold">Logout</router-link>
    </div>
  </div>
</template>
