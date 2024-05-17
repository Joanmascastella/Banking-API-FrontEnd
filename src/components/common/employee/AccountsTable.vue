<script setup>
import { ref } from 'vue';
import AbsoluteTransferLimitView from './AbsoluteTransferLimit.vue';

defineProps({
  accountListing: Array,
  ownersOfAccounts: Map,
});

const emit = defineEmits(['update-totalLimit']);

const showPopup = ref(false);
const selectedAccount = ref(null);

const openPopup = (account) => {
    selectedAccount.value = account;
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};

const setLimit = (limit) => {
    selectedAccount.value.absoluteLimit = limit;
    emit('update-totalLimit', selectedAccount.value);
    closePopup();
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NL', { style: 'currency', currency: 'EUR' }).format(value);
};
</script>


<template>
  <div class="table-container">
    <table id="accounts-table">
      <thead>
        <tr>
          <th>Account type</th>
          <th>User Id</th>
          <th>User's name</th>
          <th class="hide-column">Balance</th>
          <th class="hide-column">Absolute Limit</th>
          <th class="hide-column">Status</th>
          <th>Account</th>
          <th>Transactions</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="item in accountListing" :key="item.userId">
          <td v-if="item.accountType === 'SAVINGS'"><img src="../../../assets/img/savings-account.png"></td>
          <td v-else><img src="../../../assets/img/checking-account.png"></td>
          <td>{{ item.userId }}</td>
          <td>{{ ownersOfAccounts.get(item.userId) }}</td>
          <td class="hide-column">{{ formatCurrency(item.balance) }}</td>
          <td class="hide-column">{{ formatCurrency(item.absoluteLimit) }}</td>
          <td class="hide-column">{{ item.isActive ? 'Active' : 'Closed' }}</td>
          <td><button @click="openPopup(item)" :disabled="!item.isActive">Edit limit</button></td>
          <td><router-link :to="{ name: 'UserTransactions', params:{id: item.userId}}">
              <button>Transactions</button></router-link></td>
        </tr>
      </tbody>
    </table>
  
    <AbsoluteTransferLimitView v-if="showPopup" :absoluteLimit="selectedAccount?.absoluteLimit" @updateLimit="setLimit" @cancel="closePopup"/>;
  </div>
</template>



<style scoped>


table th {
  background-color: #FCC26B;
}

table td {
  background-color: white;
}

table,
th,
td {
  border: transparent;
}

table {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  overflow:hidden;
}

button {
  border: none;
}

td:nth-child(4n) button {
  background-color: #F9970A;
}

td:nth-child(5n) button {
  background-color: #43A801;
}

table th,
table td {
  text-align: center;
  vertical-align: middle;
}

.table-container {
    width: 100%;
    overflow-x: auto;
}

@media (max-width: 1024px) {
    .table-container {
        overflow-x: auto;
    }

    table {
        width: 100%;
        min-width: 1000px;
    }
}
</style>