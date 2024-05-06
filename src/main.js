import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';
// Create an Axios instance
const $axios = axios.create({
  baseURL: 'http://localhost:8080/'
});

// Set up an interceptor for adding the auth token to requests
$axios.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem('auth');
  console.log("Auth Token:", authToken);
  if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Create a Pinia plugin to inject Axios into stores
function axiosPlugin({ store }) {
  store.$axios = $axios;
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(axiosPlugin);

app.use(router);
app.use(pinia);
app.config.globalProperties.$axios = $axios;

app.mount('#app');
