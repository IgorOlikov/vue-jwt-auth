<template>
  <h2>Sign In</h2>
  <form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
      </span>
      <InputText type="email" v-model="email" placeholder="Your Email" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
          <i class="pi pi-at"></i>
      </span>
      <InputText type="password" v-model="password" placeholder="Password" />
    </div>
    <Loader v-if="authStore.loader"/>
    <div v-else class="flex flex-column gap-3">
      <Button label="Signin" @click="signIn"/>
      <span>Are you not registered? <router-link to="/signup">Sign Up</router-link></span>
    </div>
  </form>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import Message from 'primevue/message'
import Loader from '@/components/Loader.vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const signIn = async () => {
  await authStore.auth({email: email.value ,password: password.value}, 'signin')
  await router.push('/cars')
}

</script>
