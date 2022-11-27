<script setup lang="ts">
import { useCommentStore, type Comment } from '@/stores/comment'
import { storeToRefs } from 'pinia'
import ReplyBox from './ReplyBox.vue'

defineProps<{
  comment: Comment
  parentId?: string
}>()

const commentStore = useCommentStore()
const { replyVisibility } = storeToRefs(commentStore)
const { reply } = commentStore
</script>

<template>
  <div class="tw-flex tw-items-start">
    <img class="tw-rounded-full" :src="comment.avatar" />
    <div class="tw-ml-4">
      <div class="tw-font-bold tw-text-sm">{{ comment.name }}</div>
      <p class="tw-my-1 tw-text-lg">{{ comment.content }}</p>
      <div class="tw-text-sm tw-text-gray-500">
        <span class="tw-mr-4">{{ new Date(comment.date).toLocaleString() }}</span>
        <button type="button" @click="reply(comment.id)">回复</button>
      </div>
    </div>
  </div>
  <ReplyBox class="tw-mt-4" v-if="replyVisibility === comment.id" :parent-id="parentId" :receiver="comment.name" />
</template>
