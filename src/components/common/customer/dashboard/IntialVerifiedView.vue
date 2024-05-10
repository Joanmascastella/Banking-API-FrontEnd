<template>
    <br>
    <br>
    <br>
    <div>
      <div class="header">
        <h1 style="color: black;">Welcome, {{ userData[0].firstName }} {{ userData[0].lastName }}</h1>
      </div>
  
      <div class="action-buttons">
        <button class="btn" @click="goToTransfer">Make Transfer</button>
        <button class="btn secondary" @click="goToInternalTransfer">Transfer between your accounts</button>
      </div>
  
      <div class="account-cards">
        <div v-for="(user, index) in userData" :key="index" class="card">
          <div class="account-info">
            <h3>{{ user.accountType }} Account</h3>
            <p><strong>IBAN:</strong> {{ user.IBAN }}</p>
            <p><strong>Balance:</strong> {{ user.currency }} {{ user.balance }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "InitialVerifiedView",
    props: {
      userData: {
        type: Array,
        required: true
      }
    },
    methods: {
      goToTransfer() {
        this.$router.push({ path: '/make/transfer' });
      },
      goToInternalTransfer() {
        this.$router.push({ path: '/own/transfer' });
      }
    }
  }
  </script>
  
  <style scoped>
  body {
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
  }
  
  .header {
    text-align: center;
    margin: 40px 0;
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .btn.secondary {
    background-color: #6c757d;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
  
  .account-cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
  }
  
  .card {
    background-color: white;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: left;
  }
  
  .account-info h3 {
    margin-top: 0;
    color: #333;
  }
  
  .account-info p {
    margin: 5px 0;
    color: #555;
  }
  </style>
  