<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import CommentBox from './components/CommentBox.vue'
import ReplyBox from './components/ReplyBox.vue'
import { useCommentStore } from './stores/comment'

const commentStore = useCommentStore()
const { comments, replyVisibility } = storeToRefs(commentStore)
const { findComments } = commentStore

onMounted(() => {
  findComments()
})
</script>

<template>
  <div class="tw-bg-white tw-px-8 tw-py-2 tw-divide-y tw-divide-dashed tw-divide-gray-300">
    <ReplyBox v-if="replyVisibility === ''" class="tw-my-8" />
    <div class="tw-py-4" v-for="comment in comments" :key="comment.id">
      <div class="tw-my-4">
        <CommentBox :comment="comment" :parent-id="comment.id" />
      </div>
      <div class="tw-ml-4 sm:tw-ml-[calc(48px+1rem)] tw-my-4" v-for="subComment in comment.subComments"
        :key="subComment.id">
        <CommentBox :comment="subComment" :parent-id="comment.id" />
      </div>
    </div>
  </div>
</template>
