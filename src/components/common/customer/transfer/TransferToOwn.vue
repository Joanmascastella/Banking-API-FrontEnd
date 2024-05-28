<template>
    <br>
    <br>
    <br>
    <div class="container">
      <h2 style="color: black;">Transfer Between Your Accounts</h2>
      <form @submit.prevent="MakeTransfer">
        <h2 style="color: black;">Make Transfer</h2>
        <label for="fromAccount">From Account (IBAN):</label>
        <select v-model="transaction.fromAccount" required>
          <option :value="checkingIBAN">{{ checkingIBAN }}</option>
          <option :value="savingsIBAN">{{ savingsIBAN }}</option>
        </select>
  
        <label for="toAccount">To Account (IBAN):</label>
        <select v-model="transaction.toAccount" required>
          <option :value="checkingIBAN">{{ checkingIBAN }}</option>
          <option :value="savingsIBAN">{{ savingsIBAN }}</option>
        </select>
  
        <label for="amount">Amount (EUR):</label>
        <input type="number" v-model="transaction.amount" id="amount" placeholder="Enter amount" required>
        <button type="submit" class="btn">Make Transfer</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useCustomerPOSTAPICalls } from '@/stores/backend-calls-customer/customerPOSTAPICalls.js';
  import Swal from 'sweetalert2';
  
  export default {
    name: "TransferToOwn",
    props: {
      checkingIBAN: {
        type: String,
        required: true
      },
      savingsIBAN: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        transaction: {
          fromAccount: "",
          toAccount: "",
          amount: ""
        }
      };
    },
    methods: {
      async MakeTransfer() {
        const customerStore = useCustomerPOSTAPICalls();
        try {
          await customerStore.transferToOwn(this.transaction);
          Swal.fire({
            title: 'Success!',
            text: 'Transfer Made',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.$router.push("/");
        } catch (error) {
          console.error('Error making transfer:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error making the transfer.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
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
  select,
  button {
    margin-top: 0.5rem;
  }
  
  button {
    margin-top: 1.5rem;
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
  