<template>
    <div class="content">
      <h2>ATM Dashboard</h2>
      <div class="grid">
        <div>
          <img src="../../assets/img/withdraw.png" alt="Withdraw">
          <button @click="goToWithdraw">Withdraw</button>
        </div>
        <div>
          <img src="../../assets/img/deposit.png" alt="Deposit">
          <button @click="goToDeposit">Deposit</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "VerifiedViewATM",
    props: {
      userData: {
        type: Array,
        required: true
      }
    },
    methods: {
      goToWithdraw() {
        this.$router.push({ path: '/atm/withdraw' });
      },
      goToDeposit() {
        this.$router.push({ path: '/atm/deposit' });
      }
    }
  }
  </script>
  
  <style scoped>
  h2 {
    margin-top: 20vh;
    text-align: center;
  }
  
  .content {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .grid {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  img {
    border: solid;
    border-bottom: none;
    border-color: orange;
    padding: 5px;
    width: 100%;
  }
  
  button {
    width: 100%;
    color: #0BCA48;
    background-color: #055A0E;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0BCA48;
    color: white;
  }
  </style>