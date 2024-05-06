<template>
  <div class="loginForm">
    <form @submit.prevent="onSubmit">
      <fieldset>
        <label>
          Username
          <input type="text" name="username" placeholder="Username" v-model="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" placeholder="Password" v-model="password" />
        </label>
      </fieldset>
      <input type="submit" value="Log in" />
    </form>
  </div>
</template>

<script>
import { useAuthStore, decodeToken } from '@/stores/auth.js';
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      feedback: "",
      isSuccess: false,
    };
  },
  methods: {
    async onSubmit() {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      try {
        const response = await this.$axios.post("/login", loginData);
        const authToken = response.data.token;

        if (authToken) {
          const decoded = decodeToken(authToken);
          if (!decoded) {
            throw new Error("Failed to decode token.");
          }

          const authStore = useAuthStore();
          authStore.setUser({
            authToken: authToken,
            id: decoded.sub,
            role: decoded.auth,
            isApproved: decoded.approved,
          });

          this.feedback = "Login successful!";
          this.isSuccess = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        this.feedback = error.response && error.response.data && error.response.data.errorMessage
          ? error.response.data.errorMessage
          : "Login failed. Please check your credentials.";
        this.isSuccess = false;
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
