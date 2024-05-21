<template>
  <div class="container">
      <form @submit.prevent="getIban">
          <h2 style="color: black;">Find IBAN by Name</h2>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="user.firstName" required>

          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="user.lastName" required>

          <button type="submit" class="btn">Find IBAN</button>
      </form>

      <div v-if="ibanData" class="iban-result">
          <label for="iban">IBAN:</label>
          <input type="text" id="iban" v-model="ibanData" readonly style="color: black;">
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import Swal from 'sweetalert2';

export default {
  name: "FindIBanByName",
  setup() {
      const customerStore = useCustomerGETAPICalls();
      const user = ref({
          firstName: "",
          lastName: ""
      });

      async function getIban() {
          try {
              const result = await customerStore.getIban(user.value.firstName, user.value.lastName);
              if (result.success) {
                  Swal.fire({
                      title: 'Success!',
                      text: 'IBAN retrieved successfully!',
                      icon: 'success',
                      confirmButtonText: 'OK'
                  });
              } else {
                  throw new Error(result.message);
              }
          } catch (error) {
              console.error('Error retrieving IBAN:', error);
              Swal.fire({
                  title: 'Error!',
                  text: 'The User Does Not Exist.',
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
          }
      }

      return {
          user,
          ibanData: customerStore.getIbanData,
          getIban
      };
  }
}
</script>

<style scoped>
body {
  background-color: #f2f2f2;
  font-family: Arial, sans-serif;
}

.container {
  margin-top: 30px;
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  color: black;
  margin-top: 1rem;
}

input,
button {
  margin-top: 0.5rem;
}

button {
  margin-top: 1.5rem;
}

.iban-result {
  margin-top: 2rem;
  text-align: center;
}

.iban-result label {
  font-weight: bold;
}

.iban-result input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-top: 0.5rem;
  text-align: center;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  opacity: 0.8;
}
</style>
