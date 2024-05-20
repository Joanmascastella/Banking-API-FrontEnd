<template>
  <div class="content">
    <h2>ATM Dashboard</h2>
    <div class="header">
      <h1 style="color: black;">Welcome, {{ userData[0].firstName }} {{ userData[0].lastName }}</h1>
    </div>
    <div class="grid">
      <div>
        <img src="../../../../assets/img/withdraw.png" alt="Withdraw">
        <button @click="goToWithdraw">Withdraw</button>
      </div>
      <div>
        <img src="../../../../assets/img/deposit.png" alt="Deposit">
        <button @click="goToDeposit">Deposit</button>
      </div>
      <div>
        <img src="../../../../assets/img/check-balance.png" alt="Check Balance">
        <button @click="goToCheckBalance">Check Balance</button>
      </div>
    </div>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
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
      },
      goToCheckBalance() {
      this.$router.push({ path: '/atm/check-balance' });
    }
    }
  }
</script>

<style scoped>
h2 {
  color: black;
  margin-top: 20vh;
  text-align:center;
}

.content {
min-height:100vh;
display:flex;
align-items:center;
flex-direction:column;

}

.grid {
  width:70%;
}


img {border: solid;
border-bottom:none;
border-color:orange;
padding: 5px;
width:100%;
}

button {width: 100%;
color:#0BCA48;
background-color:#055A0E;}
.header {
    text-align: center;
    margin: 40px 0;
  }
</style>
