<template>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div>
    <div class="header">
      <h1 class="header-title">Transaction History</h1>
    </div>
    <div class="transaction-table">
      <table>
        <thead>
          <tr>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in filteredTransactions" :key="index">
            <td>{{ transaction.fromAccount }}</td>
            <td>{{ transaction.toAccount }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
  import { transactions } from '@/stores/transactions'
  
  export default {
    name: "TransactionHistory",
    props: {
      userId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        transactionss: [],
      };
    },
    computed: {
      iban() {
        return this.$route.query.iban;
      },
      filteredTransactions() {
        return this.transactionss.filter(transaction => 
          transaction.fromAccount === this.iban || transaction.toAccount === this.iban
        );
      }
    },
    created() {
      this.fetchTransactions();
    },
    methods: {
      async fetchTransactions() {
        const store = transactions();
        try {
          const response = await store.retrieveTransactionsOfUser(this.userId);
          this.transactionss = response.data;
        } catch (error) {
          console.error('Failed to fetch transactions:', error);
        }
      }
    }
  }
  </script>
  
  <style>
  .header-title {
  color: black;
}
  </style>