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
    <button @click="toggleFilterForm" class="filter-toggle-button">
      {{ showFilterForm ? 'Close Filters' : 'Show Filters' }}
    </button>
    <div v-if="showFilterForm" class="filter-form">
      <label>
        From/To IBAN:
        <input v-model="filters.iban" placeholder="Enter IBAN" />
      </label>
      <label>
        Start Date:
        <input v-model="filters.startDate" type="date" />
      </label>
      <label>
        End Date:
        <input v-model="filters.endDate" type="date" />
      </label>
      <label>
        Amount Equals:
        <input v-model="filters.amount" type="number" placeholder="Enter amount" />
      </label>
      <label>
        Amount Greater Than:
        <input v-model="filters.amountGreater" type="number" placeholder="Enter amount" />
      </label>
      <label>
        Amount Less Than:
        <input v-model="filters.amountLess" type="number" placeholder="Enter amount" />
      </label>
      <button @click="applyFilters">Apply Filters</button>
      <button @click="toggleFilterForm">Close Filters</button>
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
          <tr v-for="(transaction, index) in displayedTransactions" :key="index">
            <td>{{ transaction.fromAccount }}</td>
            <td>{{ transaction.toAccount }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.date }}</td>
          </tr>
        </tbody>
      </table>
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
        displayedTransactions: [],
        showFilterForm: false,
        filters: {
         iban: '',
         startDate: '',
         endDate: '',
         amount: null,
         amountGreater: null,
         amountLess: null
       }
      };
    },
    computed: {
      queriedIban() {
        return this.$route.query.iban;
    },
    getHistory() {
      const store = transactions();
      return store.getHistory;
    }
   },
    created() {
      this.fetchTransactions();
    },
    methods: {
      async fetchTransactions() {
        const store = transactions();
        try {
          await store.retrieveTransactionsOfUser(this.userId);
          this.transactionss = this.getHistory;
          this.displayedTransactions = this.transactionss.filter(transaction => 
          transaction.fromAccount === this.queriedIban || transaction.toAccount === this.queriedIban
        );
        } catch (error) {
          console.error('Failed to fetch transactions:', error);
        }
      },
      async applyFilters() {
      const store = transactions();
      try {
        // Construct query parameters dynamically, omitting empty fields
        const queryParams = {};
        if (this.filters.iban) queryParams.IBAN = this.filters.iban;
        if (this.filters.startDate) queryParams.startDate = this.filters.startDate;
        if (this.filters.endDate) queryParams.endDate = this.filters.endDate;
        if (this.filters.amount !== null) queryParams.amount = this.filters.amount;
        if (this.filters.amountGreater !== null) queryParams.amountGreater = this.filters.amountGreater;
        if (this.filters.amountLess !== null) queryParams.amountLess = this.filters.amountLess;

        console.log('Applying filters with query parameters:', queryParams);
        
        // Fetch filtered transactions from the server
        const response = await store.searchTransactions(queryParams);

        console.log('Response data:', response.data);

        // Filter to only include transactions involving the queried IBAN
        this.displayedTransactions = response.data.filter(transaction => 
          transaction.fromAccount === this.queriedIban || transaction.toAccount === this.queriedIban
        );
        
        console.log('Displayed transactions:', this.displayedTransactions);
      } catch (error) {
        console.error('Failed to apply filters:', error);
      }
    },

      toggleFilterForm() {
      this.showFilterForm = !this.showFilterForm;
      },
    
    }
  }
  </script>
  
  <style scoped>
.header-title {
  color: black;
}

.filter-toggle-button {
  margin-bottom: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.filter-form {
  margin-bottom: 20px;
}

.filter-form label {
  display: block;
  margin-bottom: 10px;
}

.filter-form input {
  margin-left: 10px;
}

.filter-form button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.transaction-table {
  margin-top: 20px;
}
</style>