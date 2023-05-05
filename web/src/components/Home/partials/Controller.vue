<script setup lang="ts">
import { useMemoStore } from '../../../stores/MemoStore';
import { useUserInterfaceStore } from '../../../stores/UserInterfaceStore';
import ActionButton from '../../common/ActionButton.vue';
import { deleteMemosByIds } from '../../../api/functions';

// pinia
const uiStore = useUserInterfaceStore();
const memoStore = useMemoStore();

// props
const ControllerProps = defineProps<{ isDark: boolean }>();

const handleDelete = () => {
  deleteMemosByIds();
  memoStore.deleteFn();
};
</script>

<template>
  <div class="flex gap-2 mt-4">
    <ActionButton :btn-color="ControllerProps.isDark ? `bg-blue-400` : `bg-blue-900`" @on-click="uiStore.handleRegisterModal">
      New Memo
      <font-awesome-icon :icon="['fas', 'pen-to-square']" />
    </ActionButton>
    <ActionButton :btn-color="ControllerProps.isDark ? `bg-gray-400` : `bg-gray-500`" @on-click="handleDelete">
      Delete Memo
      <font-awesome-icon :icon="['fas', 'eraser']" />
    </ActionButton>
  </div>
</template>
