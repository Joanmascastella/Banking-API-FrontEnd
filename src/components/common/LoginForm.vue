<template>
  <div class="loginForm">
    <form @submit.prevent="onSubmit">
      <fieldset>
        <label style="color: black;">Username<input type="text" name="username" placeholder="Username" v-model="username" /></label>
        <label style="color: black;">Password<input type="password" name="password" placeholder="Password" v-model="password" /></label>
      </fieldset>
      <input type="submit" value="Log in" />
      <p v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      feedback: "",
    };
  },
  methods: {
    async onSubmit() {
      const authStore = useAuthStore();
      const { success, message } = await authStore.login(this.username, this.password);
      this.feedback = message;
      if (success) {
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      }
    }
  },
};
</script>

<style scoped>
.loginForm {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

form {
  width: 50%;
  margin: 0 auto;
}

input[type="submit"] {
  background-color: #fa6f0e;
  border: none;
}
</style>
