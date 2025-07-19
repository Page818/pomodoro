<template>
  <v-container class="starry-bg pa-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="starry-card pa-6" elevation="10">
          <h1 class="text-center yellow--text mb-6" style="font-family: 'Playfair Display', serif">
            鈴聲設定
          </h1>

          <v-radio-group v-model="settings.selected" hide-details>
            <v-table>
              <thead>
                <tr>
                  <th class="text-yellow">名稱</th>
                  <th class="text-yellow">試聽</th>
                  <th class="text-yellow">選擇</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="alarm in settings.alarms" :key="alarm.id">
                  <td class="white--text">{{ alarm.name }}</td>
                  <td>
                    <audio :src="alarm.file" controls preload="none" />
                  </td>
                  <td>
                    <v-radio :value="alarm.id" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
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
  box-shadow: 0 0 15px 2px rgba(241, 196, 15, 0.5), inset 0 0 10px 3px rgba(255, 255, 255, 0.1);
  color: #f1c40f;
  text-align: center;
  font-family: 'Playfair Display', serif;
}
.text-yellow {
  color: #f1c40f;
}
</style>
