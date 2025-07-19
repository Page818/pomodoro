import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const alarms = [
    { id: 1, name: '01', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
    { id: 2, name: '02', file: new URL('@/assets/yay.mp3', import.meta.url).href },
    {
      id: 3,
      name: '03',
      file: new URL('@/assets/goofy-ahh-car-horn-200870.mp3', import.meta.url).href,
    },
    {
      id: 4,
      name: '04',
      file: new URL('@/assets/kl-peach-game-over-iii-142453.mp3', import.meta.url).href,
    },
  ]

  const selected = ref(1)

  return {
    alarms,
    selected,
  }
})
