<template>
  <nav>
    <ul>
      <li><a href="/" style="color: white;"><strong>BankAPI</strong></a></li>
    </ul>
    <ul v-if="authStore.user">
      <li v-if="authStore.isCustomer && approved">
        <a href="/account/details" style="color: white;">View Account Details</a>
      </li>
      <li v-if="authStore.user" class="nav-item">
        <a class="nav-link btn btn-danger" style="color: white;" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';

export default {
  name: "Navigation",
  setup() {
    const authStore = useAuthStore();
    const approved = computed(() => authStore.isUserApproved);
    const router = useRouter();

    onMounted(() => {
      authStore.checkUser();
    });

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    return { authStore, approved, logout };
  },
};
</script>

<style scoped>
nav {
  width: 100vw;
  background-color: green;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

li {
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
}

ul:first-of-type>li {
  color: white;
  font-size: 25px;
}
</style>