<script setup lang="ts">
import { useCommentStore } from '@/stores/comment'
import { storeToRefs } from 'pinia'

defineProps<{
  parentId?: string
  receiver?: string
}>()

const commentStore = useCommentStore()
const { comment } = storeToRefs(commentStore)
const { cancel, insertComment } = commentStore
comment.value.name = localStorage.getItem('comment-name') ?? ''
comment.value.email = localStorage.getItem('comment-email') ?? ''
</script>

<template>
  <form class="tw-flex tw-flex-col tw-border-dashed tw-border-2 tw-rounded tw-border-gray-400"
    @submit.prevent="insertComment(parentId, receiver)">
    <div
      class="tw-flex tw-justify-between tw-gap-4 tw-flex-col sm:tw-flew-row tw-mx-2 tw-px-2 tw-py-4 tw-border-b tw-border-solid tw-border-gray-200">
      <input required type="text" class="tw-outline-none tw-basis-1/2 tw-bg-white" placeholder="称呼"
        v-model="comment.name" />
      <input required type="email" class="tw-outline-none tw-basis-1/2 tw-bg-white" placeholder="邮箱"
        v-model.trim="comment.email" />
    </div>
    <textarea required class="tw-outline-none tw-p-4 tw-resize-none tw-bg-white" rows="7"
      :placeholder="receiver === undefined ? '请发表您的见解：' : `回复 @${receiver}：`" v-model="comment.content"></textarea>
    <div class="tw-p-4 tw-flex tw-justify-end tw-gap-4">
      <button type="button"
        class="tw-inline-block tw-px-6 tw-py-2.5 tw-bg-blue-600 tw-text-white tw-font-medium tw-text-xs tw-leading-tight tw-uppercase tw-rounded tw-shadow-md hover:tw-bg-blue-700 hover:tw-shadow-lg focus:tw-bg-blue-700 focus:tw-shadow-lg focus:tw-outline-none focus:tw-ring-0 active:tw-bg-blue-800 active:tw-shadow-lg tw-transition tw-duration-150 tw-ease-in-out"
        @click="cancel" v-if="receiver !== undefined">取消</button>
      <button
        class="tw-inline-block tw-px-6 tw-py-2.5 tw-bg-blue-600 tw-text-white tw-font-medium tw-text-xs tw-leading-tight tw-uppercase tw-rounded tw-shadow-md hover:tw-bg-blue-700 hover:tw-shadow-lg focus:tw-bg-blue-700 focus:tw-shadow-lg focus:tw-outline-none focus:tw-ring-0 active:tw-bg-blue-800 active:tw-shadow-lg tw-transition tw-duration-150 tw-ease-in-out">提交</button>
    </div>
  </form>
</template>
