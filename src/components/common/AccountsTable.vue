<template>
 <div class="content">
        <h2>Accounts</h2>
        <table>
            <thead>
            <tr>
                <th>Account type</th>
                <th>User Id</th>
                <th>User's name</th>
                <th>Account</th>
                <th>Transactions</th>

            </tr>
            </thead>
            <tbody>
              <tr v-for="item in accounts" :key="item.userId">
                  <td v-if="item.accountType==='SAVINGS'"><img src="../../assets/img/savings-account.png"></td>
                  <td v-else><img src="../../assets/img/checking-account.png"></td>
                  <td>{{ item.userId }}</td>
                  <td>{{ownersOfAccounts.get(item.userId)}}</td>
                  <td><router-link :to="{ path : '#' }">
                      <button>Account details</button>  </router-link></td>
                  <td><router-link :to="{ path : '#' }">
                     <button>Transactions</button></router-link></td>
                  
              </tr>
            </tbody>
        </table>
        {{map2}}
    </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [],
    };
  },
  methods: {
    async fetchAccountsAndUsers() {
      try {
        const accountsResponse = await this.$axios.get(`/accounts/customers`);
        const usersResponse = await this.$axios.get(`/users`);
        const userMap = new Map(usersResponse.data.map(user => [user.id, `${user.firstName} ${user.lastName}`]));
        
        this.accounts = accountsResponse.data.map(account => ({
          ...account,
          userName: userMap.get(account.userId) || 'Unknown'
        }));
      } catch (error) {
        console.error("Failed to fetch accounts or users", error);
      }
    },
  },
  mounted() {
    this.fetchAccountsAndUsers();
  }
};
</script>


<style scoped>

h2 {text-align: center;
margin-top:20vh;}


.content {
min-height:100vh;
display:flex;
align-items:center;
flex-direction:column;
margin-left:5%;
margin-right:5%;
}

table th{background-color:#FCC26B;}
table td {background-color: white;}

table, th, td {
  border: transparent;
}
table {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  overflow:hidden
}

button{border:none;}
td:nth-child(4n) button {background-color: #F9970A;}
td:nth-child(5n) button {background-color:#43A801;}

 table th,
 table td
{
    text-align: center; 
    vertical-align: middle;
}

</style>