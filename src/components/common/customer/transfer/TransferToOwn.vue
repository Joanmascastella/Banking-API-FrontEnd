<template>
    <br>
    <br>
    <br>
    <div class="container">
        <h2 style="color: black;">Transfer Between Your Accounts</h2>
        <form @submit.prevent="MakeTransfer">
            <h2 style="color: black;">Make Transfer</h2>
            <label for="fromAccount">From Account (IBAN):</label>
            <div class="account-inputs">
                <input type="text" v-model="fromAccountPart1" @paste="handlePaste($event, 'from')"
                    @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart2" @paste="handlePaste($event, 'from')"
                    @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart3" @paste="handlePaste($event, 'from')"
                    @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart4" @paste="handlePaste($event, 'from')"
                    @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart5" @paste="handlePaste($event, 'from')"
                    @input="restrictLength($event, 2)" required>
            </div>

            <label for="toAccount">To Account (IBAN):</label>
            <div class="account-inputs">
                <input type="text" v-model="toAccountPart1" @paste="handlePaste($event, 'to')"
                    @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart2" @paste="handlePaste($event, 'to')"
                    @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart3" @paste="handlePaste($event, 'to')"
                    @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart4" @paste="handlePaste($event, 'to')"
                    @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart5" @paste="handlePaste($event, 'to')"
                    @input="restrictLength($event, 2)" required>
            </div>

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
    data() {
        return {
            transaction: {
                fromAccount: "",
                toAccount: "",
                amount: ""
            },
            fromAccountPart1: "",
            fromAccountPart2: "",
            fromAccountPart3: "",
            fromAccountPart4: "",
            fromAccountPart5: "",
            toAccountPart1: "",
            toAccountPart2: "",
            toAccountPart3: "",
            toAccountPart4: "",
            toAccountPart5: "",
        };
    },
    methods: {
        async MakeTransfer() {
            this.transaction.fromAccount = `${this.fromAccountPart1}${this.fromAccountPart2}${this.fromAccountPart3}${this.fromAccountPart4}${this.fromAccountPart5}`;
            this.transaction.toAccount = `${this.toAccountPart1}${this.toAccountPart2}${this.toAccountPart3}${this.toAccountPart4}${this.toAccountPart5}`;

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
        },
        restrictLength(event, maxLength) {
              if (event.target.value.length > maxLength) {
                  event.target.value = event.target.value.slice(0, maxLength);
              }
          },
          fillInputs(value, target) {
            const parts = value.match(/\w{1,4}/g);
            if (target === 'from') {
                [this.fromAccountPart1, this.fromAccountPart2, this.fromAccountPart3, this.fromAccountPart4, this.fromAccountPart5] = parts;
            } else if (target === 'to') {
                [this.toAccountPart1, this.toAccountPart2, this.toAccountPart3, this.toAccountPart4, this.toAccountPart5] = parts;
            }
        },
        handlePaste(event, target) {
            const pastedData = (event.clipboardData || window.clipboardData).getData('text');
            setTimeout(()=> {
                this.fillInputs(pastedData, target);
            }, 0);
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
button {
    margin-top: 0.5rem;
}

button {
    margin-top: 1.5rem;
}

.account-inputs {
    display: flex;
    align-items: center;
}

.account-inputs input {
    width: 67px;
    margin: 0 2px;
    padding: 5px;
}

.account-inputs span {
    margin: 0 2px;
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