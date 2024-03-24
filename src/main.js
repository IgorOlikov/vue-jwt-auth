import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { initializeApp } from "firebase/app";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

const firebaseConfig = {

  apiKey: "AIzaSyAFMvV3i2xw8-Bs-h6dBHNqWmsaMOeUXZs",

  authDomain: "jwt-firebase-vue3-3fc42.firebaseapp.com",

  projectId: "jwt-firebase-vue3-3fc42",

  storageBucket: "jwt-firebase-vue3-3fc42.appspot.com",

  messagingSenderId: "44104393804",

  appId: "1:44104393804:web:84a04dc0d6447eb9f340e9"

};

import App from './App.vue'
import router from './router'


initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);


app.mount('#app')




