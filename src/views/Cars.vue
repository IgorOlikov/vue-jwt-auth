<script setup>
import axios from 'axios'
import Card from 'primevue/card'
import Loader from '@/components/Loader.vue'
import { useAuthStore } from '@/stores/auth.js'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore();

const cars = ref();

const showLoader = ref(false);

const getAllCars = async () => {
  try {
    showLoader.value = true;
    const response = await axios.get(`https://jwt-firebase-vue3-3fc42-default-rtdb.europe-west1.firebasedatabase.app/cars.json?auth=${authStore.userInfo.token}`)

    cars.value = response.data;

  } catch (err) {
   // console.log(err)
  } finally {
    showLoader.value = false;
  }
}

onMounted(async ()=> {
  await getAllCars();
})

</script>

<template>

  <div>
    <h2>Cars</h2>
    <Loader v-if="showLoader"/>
    <div class="flex flex-column gap-3" v-else>
      <Card v-for="(car, i) in cars" :key="i">
        <template #title> {{car.name}} </template>
        <template #subtitle> {{car.type}} </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>