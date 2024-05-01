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
import { useAuthStore } from '@/stores/auth.js';


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
        // Update the way you access the authToken
        const authToken = response.data.token;  // Updated to match the actual response structure

        if (authToken) {  // Check for authToken directly
          const authStore = useAuthStore();
          authStore.setUser({
            authToken: authToken,  // Set the authToken
            // Other details must also be correctly returned and handled here, for now assuming id, email, role are provided
            id: response.data.id,
            email: response.data.email,
            role: response.data.role,
          });
          this.feedback = "Login successful!";
          this.isSuccess = true;
          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 1000); // Add a delay of 1000ms
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        this.feedback =
          error.response && error.response.data && error.response.data.errorMessage
            ? error.response.data.errorMessage
            : "Login failed. Please check your credentials.";
        this.isSuccess = false;
      }
    },
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
