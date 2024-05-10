<template>
    <br>
    <br>
    <br>
    <div class="container">
        <h2 style="color: black;">Make Transfer</h2>
        <form @submit.prevent="MakeTransfer">
            <label for="fromAccount">From Account (IBAN):</label>
            <div class="account-inputs">
                <input type="text" v-model="fromAccountPart1" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart2" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart3" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart4" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart5" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="fromAccountPart6" @input="restrictLength($event, 2)" required>
            </div>

            <label for="toAccount">To Account (IBAN):</label>
            <div class="account-inputs">
                <input type="text" v-model="toAccountPart1" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart2" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart3" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart4" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart5" @input="restrictLength($event, 4)" required>
                <span> </span>
                <input type="text" v-model="toAccountPart6" @input="restrictLength($event, 2)" required>
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
    name: "TransferToOthers",
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
            fromAccountPart6: "",
            toAccountPart1: "",
            toAccountPart2: "",
            toAccountPart3: "",
            toAccountPart4: "",
            toAccountPart5: "",
            toAccountPart6: ""
        };
    },
    methods: {
        async MakeTransfer() {
            this.transaction.fromAccount = `${this.fromAccountPart1}${this.fromAccountPart2}${this.fromAccountPart3}${this.fromAccountPart4}${this.fromAccountPart5}${this.fromAccountPart6}`;
            this.transaction.toAccount = `${this.toAccountPart1}${this.toAccountPart2}${this.toAccountPart3}${this.toAccountPart4}${this.toAccountPart5}${this.toAccountPart6}`;

            const customerStore = useCustomerPOSTAPICalls();
            try {
                await customerStore.transferToOthers(this.transaction);
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
                    text: 'There was an error making transfer.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
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