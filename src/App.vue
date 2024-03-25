<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { computed } from 'vue'

const authStore = useAuthStore();

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))

  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
    authStore.userInfo.userId = tokens.userId
    authStore.userInfo.expiresIn = tokens.expiresIn
    authStore.userInfo.email = tokens.email
  }

}
checkUser()

const token = computed(() => authStore.userInfo.token);



</script>

<template>
  <div class="menu">
    <router-link to="/">Home</router-link>
    <router-link to="/signin" v-if="!token">Login</router-link>
    <router-link to="/cars" v-if="token">Cars</router-link>
  </div>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>

.container {
  margin: auto;
  max-width: 700px;
}

</style>
