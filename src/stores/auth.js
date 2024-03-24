import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


const apiKey = 'AIzaSyAFMvV3i2xw8-Bs-h6dBHNqWmsaMOeUXZs';


export const useAuthStore
  = defineStore('auth', () => {

    const userInfo = ref({
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
      expiresIn: ''
    })

  const error = ref('')
  const loader = ref(false)

    const signUp = async (payload) => {
      error.value = '';
      loader.value = true;
      try{
        let response
          = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
          {
            ...payload,
            returnSecureToken: true,
          });
        userInfo.value = {
          token: response.data.idToken,
          email: response.data.email,
          userId: response.data.localId,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn
        }
        loader.value = false;
      } catch (err){
        loader.value = false;
        switch (err.response.data.error.message) {
          case 'EMAIL_EXISTS':
            error.value = 'Email exists'
            break;
          case 'OPERATION_NOT_ALLOWED':
            error.value = 'Operation not allowed';
            break;
          default:
            error.value = 'Error'
          break;
        }
      }
    }

  return { signUp, userInfo, error, loader }
})
