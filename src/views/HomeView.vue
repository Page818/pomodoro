<template>
  <v-container class="starry-bg pa-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="starry-card pa-6" elevation="12">
          <h1 class="title yellow--text mb-4">目前事項</h1>

          <h2 class="white--text mb-2">
            {{ list.currentItem || 'chill' }}
          </h2>

          <h2 class="timer-text yellow--text mb-6">
            {{ timeLeftText }}
          </h2>

          <div class="digit-number-wrapper mb-6">
            <DigitNumber v-for="(data, i) in timeLeftText" :key="i" color="#f1c40f" :data="data" />
          </div>

          <div class="d-flex justify-center">
            <v-btn
              class="starry-btn mx-2"
              :disabled="
                status === STATUS.COUNTING || (!list.currentItem && list.items.length === 0)
              "
              icon="mdi-play"
              @click="startTimer"
              title="開始"
            />
            <v-btn
              class="starry-btn mx-2"
              :disabled="status !== STATUS.COUNTING"
              icon="mdi-pause"
              title="暫停"
            />
            <v-btn
              class="starry-btn mx-2"
              :disabled="!list.currentItem"
              icon="mdi-skip-next"
              title="跳過"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import DigitNumber from '@/components/DigitNumber.vue'
import { useListStore } from '@/stores/list'

const list = useListStore()

const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2,
}
const status = ref(STATUS.STOP)

let timer = 0

const startTimer = () => {
  if (status.value === STATUS.STOP && list.items.length > 0) {
    list.setCurrentItem()
  }

  status.value = STATUS.COUNTING

  timer = setInterval(() => {
    list.countdown()
    if (list.timeleft <= 0) clearInterval(timer)
  }, 1000)
}

const timeLeftText = computed(() => {
  const m = Math.floor(list.timeleft / 60)
    .toString()
    .padStart(2, '0')
  const s = (list.timeleft % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Roboto&display=swap');

.starry-bg {
  background: url('assets/milky-way-5905903_1920.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.starry-card {
  background: rgba(10, 24, 56, 0.7);
  border-radius: 20px;
  box-shadow: 0 0 15px 2px rgba(241, 196, 15, 0.7), inset 0 0 10px 3px rgba(255, 255, 255, 0.15);
  color: #f1c40f;
  text-align: center;
  font-family: 'Playfair Display', serif;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
}

.timer-text {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
}

.digit-number-wrapper {
  display: flex;
  justify-content: center;
  gap: 0.3rem;
}

.starry-btn {
  color: #f1c40f !important;
  border-color: #f1c40f !important;
  transition: all 0.3s ease;
}
.starry-btn:hover {
  background: linear-gradient(45deg, #f1c40f, #2980b9);
  color: #000 !important;
}
</style>
