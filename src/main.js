import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';

const $axios = axios.create({
  baseURL: 'https://localhost:8080/'
});

//Making authtoken globally accessible
$axios.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.config.globalProperties.$axios = $axios;

app.mount('#app');
