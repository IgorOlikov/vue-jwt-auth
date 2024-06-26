import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;


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

    const auth = async (payload, type) => {
      const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword';
      error.value = '';
      loader.value = true;
      try{
        let response
          = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`,
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

        localStorage.setItem('userTokens', JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          email: userInfo.value.email,
          userId: userInfo.value.userId,
          expiresIn: userInfo.value.expiresIn
        }))

      } catch (err){

        switch (err.response.data.error.message) {
          case 'EMAIL_EXISTS':
            error.value = 'Email exists'
            break;
          case 'OPERATION_NOT_ALLOWED':
            error.value = 'Operation not allowed';
            break;
          case 'EMAIL_NOT_FOUND':
            error.value = 'Email not found';
            break;
          case 'INVALID_LOGIN_CREDENTIALS':
            error.value = 'Invalid login credentials';
            break;
          case 'INVALID_PASSWORD':
            error.value = 'Invalid password';
            break;
          case 'INVALID_EMAIL':
            error.value = 'Invalid email';
            break;
          default:
            error.value = 'Error'
          break;
        }
        throw error.value;
      } finally {
        loader.value = false;
      }
    }

  return { auth, userInfo, error, loader }
})
