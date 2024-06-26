<script setup>
import { ref, onMounted } from 'vue';
import AbsoluteTransferLimitView from './AbsoluteTransferLimit.vue';
import { users } from "../../../stores/users";
import { useRoute } from 'vue-router'


const userStore = users();
const route = useRoute()
const rootColor = ref();


const setBaseColor = () => rootColor.value = getComputedStyle(document.documentElement).getPropertyValue('--root-color');

onMounted(setBaseColor);


defineProps({
  accountListing: Array,
  ownersOfAccounts: Map,
});

async function retrieveUser(accounts, accountOwnerData) {

  await userStore.retrieveAllUsers();

  for (let index = 0; index < accounts.length; index++) {
    let item = accounts[index];
    let result = userStore.usersData.filter((user) => user.id === item.userId);
    accountOwnerData.set(item.userId, result[0].firstName + result[0].lastName);
  }

}


defineExpose({
  retrieveUser,

})


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

function setItemRef(el, item) {
  if (route.query.accountId == item.id) {
    el.childNodes.forEach((item) => item.classList.add("root"));


  }

}


</script>



<template>

  <table id="accounts-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>IBAN</th>
        <th>Account type</th>
        <th>User's name</th>
        <th>Balance</th>
        <th>Absolute Limit</th>
        <th>Status</th>
        <th>Account</th>

      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in accountListing" :key="item.id">
        <tr :ref="(el) => setItemRef(el, item)" id="selectedRow">
          <td>{{ item.id }}</td>
          <td>{{ item.IBAN }} </td>
          <td v-if="item.accountType === 'SAVINGS'"><img src="../../../assets/img/savings-account.png"></td>
          <td v-else><img src="../../../assets/img/checking-account.png"></td>
          <td>{{ ownersOfAccounts.get(item.userId) }}</td>
          <td>{{ formatCurrency(item.balance) }}</td>
          <td>{{ formatCurrency(item.absoluteLimit) }}</td>
          <td>{{ item.isActive ? 'Active' : 'Closed' }}</td>
          <td><button @click="openPopup(item)" :disabled="!item.isActive">Edit limit</button></td>

        </tr>

      </template>
    </tbody>
  </table>

  <AbsoluteTransferLimitView v-if="showPopup" :absoluteLimit="selectedAccount?.absoluteLimit" @updateLimit="setLimit"
    @cancel="closePopup" />



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
  height: 100%;
}


table th,
table td {
  text-align: center;
  vertical-align: middle;
}


@media only screen and (max-width:1080px) {

  table {
    display: block;
    overflow-x: scroll;
    white-space: nowrap;
  }
}

@media only screen and (max-width:1080px) {
  button {
    font-size: smaller;

  }



}



.root {
  background: var(--root-color);
  color: #000000
}
</style>

<style>
:root {
  --root-color: #B3FFAE
}
</style>