<template>

<nav>
  <ul>
    <li><strong>BankAPI</strong></li>
  </ul>
  <ul>
    <li><router-link to="/login">Login</router-link></li>
    <li><router-link to="#">Register</router-link></li>
  </ul>
</nav>

</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';

export default {
    name: "Navigation",
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        const logout = () => {
            authStore.logout();
            router.push('/');
        };

        return { authStore, logout };
    },
};
</script>

<style scoped>
nav {
    width:100vw;
    background-color: green;
    position: fixed;
    top: 0;
    left:0;
    z-index:1;
}

li{
font-size:20px;
font-weight:bold;
margin:5px;}

ul:first-of-type > li {color: white;
font-size: 25px;}




</style>