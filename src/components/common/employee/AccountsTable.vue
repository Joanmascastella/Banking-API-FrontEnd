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

    <table id="accounts-table">
      <thead>
        <tr>
          <th>Account type</th>
          <th>User Id</th>
          <th>User's name</th>
          <th>Balance</th>
          <th>Absolute Limit</th>
          <th>Status</th>
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
          <td>{{ formatCurrency(item.balance) }}</td>
          <td>{{ formatCurrency(item.absoluteLimit) }}</td>
          <td>{{ item.isActive ? 'Active' : 'Closed' }}</td>
          <td><button @click="openPopup(item)">Edit limit</button></td>
          <td><router-link :to="{ name: 'UserTransactions', params:{id: item.userId}}">
              <button>Transactions</button></router-link></td>

        </tr>
      </tbody>
    </table>
  
    <AbsoluteTransferLimitView v-if="showPopup" :absoluteLimit="selectedAccount?.absoluteLimit" @updateLimit="setLimit" @cancel="closePopup"/>;

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
  overflow: hidden;
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
</style>