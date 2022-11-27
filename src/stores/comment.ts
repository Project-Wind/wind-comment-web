import { baseURL } from '@/main'
import md5 from 'md5'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Comment {
  id: string
  avatar: string
  name: string
  email: string
  content: string
  date: number
  subComments: Array<Comment> | null
}

export const useCommentStore = defineStore('comment', () => {
  const comments = ref(new Array<Comment>())
  const comment = ref<Comment>({
    id: '',
    avatar: '',
    name: '',
    email: '',
    content: '',
    date: 0,
    subComments: null,
  })
  const replyVisibility = ref('')

  function reply(id: string) {
    replyVisibility.value = id
  }

  function cancel() {
    replyVisibility.value = ''
  }

  const articleId = encodeURIComponent(document.URL)

  async function findComments() {
    try {
      comments.value = await (await fetch(`${baseURL}/api/v1/${articleId}/comments`)).json()
    } catch (err) {
      console.log(err)
    }
  }

  async function insertComment(parentId?: string, replyTo?: string) {
    localStorage.setItem('comment-name', comment.value.name)
    localStorage.setItem('comment-email', comment.value.email)
    comment.value.avatar = `https://www.gravatar.com/avatar/${md5(comment.value.email.toLowerCase())}?d=mp&s=48`
    comment.value.content = replyTo === undefined ? comment.value.content : `回复 @${replyTo}：${comment.value.content}`
    comment.value.date = Date.now()
    try {
      await fetch(`${baseURL}/api/v1/${articleId}/comment${parentId === undefined ? '' : `?parentId=${parentId}`}`, {
        method: 'POST',
        body: JSON.stringify(comment.value),
      })
      await findComments()
      cancel()
      comment.value = {
        id: '',
        avatar: '',
        name: localStorage.getItem('comment-name') ?? '',
        email: localStorage.getItem('comment-email') ?? '',
        content: '',
        date: 0,
        subComments: null,
      }
    } catch (err) {
      console.log(err)
    }
  }

  return { comments, comment, replyVisibility, reply, cancel, findComments, insertComment }
})
