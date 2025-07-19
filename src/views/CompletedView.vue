<template>
  <v-container class="starry-bg pa-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="starry-card pa-6" elevation="12">
          <h1 class="title yellow--text mb-4 text-center">已完成事項</h1>
          <v-table>
            <thead>
              <tr>
                <th>事項</th>
                <th>完成時間</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="completed.items.length === 0">
                <td colspan="2" class="text-center">尚未有完成的事項</td>
              </tr>
              <tr v-for="item in completed.items" :key="item.id">
                <td>{{ item.text }}</td>
                <td>{{ item.completedAt }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCompletedStore } from '@/stores/completed'
const completed = useCompletedStore()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Roboto&display=swap');
.starry-bg {
  background: url('assets/milky-way-5905903_1920.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
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
</style>
