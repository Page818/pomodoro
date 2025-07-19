<template>
  <v-app>
    <v-app-bar flat class="starry-appbar">
      <v-container class="d-flex align-center justify-space-between">
        <v-app-bar-title class="text-yellow font-weight-bold">pomodoro</v-app-bar-title>
        <div>
          <v-btn variant="outlined" class="starry-btn" prepend-icon="mdi-home" to="/">HOME</v-btn>
          <v-btn
            variant="outlined"
            class="starry-btn"
            prepend-icon="mdi-format-list-bulleted"
            to="/list"
            >LIST</v-btn
          >
          <v-btn variant="outlined" class="starry-btn" prepend-icon="mdi-cog" to="/settings"
            >SETTINGS</v-btn
          >
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="starry-bg">
      <!--
        slot = 插槽 = 自訂元件內的某部分 HTML
        v-slot="插槽提供的元件內的變數"
        https://zh-hk.vuejs.org/guide/components/sAlots.html#scoped-slots
        Component = 目前路由應該顯示的元件
        https://router.vuejs.org/zh/guide/advanced/router-view-slot.html#RouterView-%E6%8F%92%E6%A7%BD
      -->
      <router-view v-slot="{ Component }">
        <!--
          keep-alive 包住的元件不會被銷毀
          include 指定保留的元件
          https://zh-hk.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        -->
        <!--
          component 動態元件
          is 要使用的元件
        -->
        <keep-alive include="HomeView">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap');

.starry-bg {
  background: url('assets/milky-way-5905903_1920.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  color: #f1f2f6;
  font-family: 'Playfair Display', serif;
  padding-bottom: 40px;
}

.starry-appbar {
  background-color: rgba(20, 24, 82, 0.7) !important;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 12px rgba(241, 196, 15, 0.6);
  color: #f1c40f;
}

.starry-btn {
  color: #f1c40f !important;
  border-color: #f1c40f !important;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.starry-btn:hover {
  background: linear-gradient(to right, #f1c40f, #2980b9);
  color: #000 !important;
}
body {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: #f1f2f6;
}
</style>
<script setup></script>
