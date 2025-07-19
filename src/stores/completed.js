import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useCompletedStore = defineStore('completed', () => {
  const items = reactive([])

  const addItem = item => {
    items.push({
      id: item.id,
      text: item.text,
      completedAt: new Date().toLocaleString(),
    })
  }

  return { items, addItem }
})
