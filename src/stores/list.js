import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useCompletedStore } from './completed'

// 從環境變數讀取工作時間與休息時間（秒）
const timeWork = Number.parseInt(import.meta.env.VITE_TIME) || 1500
const timeBreak = Number.parseInt(import.meta.env.VITE_TIME_BREAK) || 300

export const useListStore = defineStore('list', () => {
  // 未完成事項列表
  const items = reactive([])
  // 目前進行中的事項名稱
  const currentItem = ref('')
  // 是否為休息中
  const isBreak = ref(false)
  // 剩餘秒數
  const timeleft = ref(timeWork)
  // 事項 ID 用來標記項目
  let id = 1

  // ✅ 完成事項 store
  const completed = useCompletedStore()

  // ➕ 新增事項
  const addItem = value => {
    items.push({
      id: id++,
      text: value,
      edit: false,
      model: value,
    })
  }

  const setNextItem = () => {
    if (items.length === 0) {
      currentItem.value = ''
      return
    }
    // 🔁 移除目前事項
    const skipped = items.shift()

    // 設定下一個項目
    const next = items[0]
    currentItem.value = next?.text || ''
    timeleft.value = timeWork
    isBreak.value = false
  }

  // 📝 編輯事項
  const editItem = id => {
    const i = items.findIndex(item => item.id === id)
    if (i !== -1) items[i].edit = true
  }

  // ✔️ 提交編輯
  const submitEdit = id => {
    const i = items.findIndex(item => item.id === id)
    if (i !== -1) {
      items[i].text = items[i].model
      items[i].edit = false
    }
  }

  // ❌ 取消編輯
  const cancelEdit = id => {
    const i = items.findIndex(item => item.id === id)
    if (i !== -1) {
      items[i].model = items[i].text
      items[i].edit = false
    }
  }

  // 🗑️ 刪除事項
  const delItem = id => {
    const i = items.findIndex(item => item.id === id)
    if (i !== -1) items.splice(i, 1)
  }

  // ⏱️ 倒數計時器，每秒呼叫
  const countdown = () => {
    timeleft.value--

    if (timeleft.value <= 0) {
      if (isBreak.value) {
        // 休息結束 ➝ 進入下一項任務
        setCurrentItem()
      } else {
        // 任務結束 ➝ 開始休息
        startBreak()
      }
    }
  }

  // ▶️ 設定目前進行的任務
  const setCurrentItem = () => {
    if (items.length === 0) {
      currentItem.value = ''
      return
    }

    const next = items.shift()
    currentItem.value = next.text

    // ✅ 加入完成列表
    completed.addItem(next)

    isBreak.value = false
    timeleft.value = timeWork
  }

  // 💤 進入休息階段
  const startBreak = () => {
    currentItem.value = '休息一下'
    isBreak.value = true
    timeleft.value = timeBreak
  }

  return {
    // 狀態
    items,
    currentItem,
    timeleft,
    isBreak,

    // 方法
    addItem,
    editItem,
    submitEdit,
    cancelEdit,
    delItem,
    countdown,
    setCurrentItem,
    startBreak,
    setNextItem,
  }
})
