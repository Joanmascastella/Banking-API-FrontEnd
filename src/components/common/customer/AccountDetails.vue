<template>
    <br>
    <div class="container">
        <div v-if="userData.length > 0" class="card" style="color: black;">
            <div class="user-info">
                <h3 style="color: black;">User Details</h3>
                <p><strong>Username:</strong> {{ userData[0].username }}</p>
                <p><strong>Email:</strong> {{ userData[0].email }}</p>
                <p><strong>Name:</strong> {{ userData[0].firstName }} {{ userData[0].lastName }}</p>
                <p><strong>BSN:</strong> {{ userData[0].BSN }}</p>
                <p><strong>Phone:</strong> {{ userData[0].phoneNumber }}</p>
                <p><strong>Birth Date:</strong> {{ userData[0].birthDate }}</p>
            </div>
        </div>

        <div v-for="(account, index) in userData" :key="index" class="card" style="color: black;">
            <div class="account-info">
                <h3 style="color: black;">{{ account.accountType }} Account</h3>
                <p><strong>IBAN:</strong> {{ account.IBAN }}</p>
                <p><strong>Currency:</strong> {{ account.currency }}</p>
                <p><strong>Account Type:</strong> {{ account.accountType }}</p>
                <p><strong>Balance:</strong> €{{ account.balance }}</p>
                <p><strong>Absolute Limit:</strong> €{{ account.absoluteLimit }}</p>
            </div>
        </div>

        <div class="card" style="color: black;">
            <p style="color: black;"><strong>Total Balance:</strong> {{ totalBalance }}</p>
        </div>
    </div>
</template>

<script>
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: "AccountDetails",
    data() {
        return {
            totalBalance: 0
        }
    },
    setup() {
        const customerGetAPICalls = useCustomerGETAPICalls();
        const router = useRouter();

        async function getAccountDetails() {
            const result = await customerGetAPICalls.getUserAccountDetails();
            console.log('API Data:', result);
            if (!result.success) {
                console.error("Failed to fetch account details", result.message);
            }
        }

        function goBack() {
            router.push("/");
        }

        onMounted(getAccountDetails);

        return {
            userData: customerGetAPICalls.getUserData,
            goBack
        };
    },
    computed: {
        totalBalance() {
            if (this.userData && this.userData.length >= 2) {
                const totalBalance = this.userData[0].balance + this.userData[1].balance;
                return totalBalance;
            } else {
                return 0; 
            }
        }
    }

}

</script>

<style scoped>
.container {
    margin: 0 auto;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-wrap: row;
}

.card {
    background-color: #f9f9f9;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex: 1 1 calc(50% - 40px);
    max-width: calc(50% - 40px);
}

.user-info,
.account-info {
    display: flex;
    flex-wrap: wrap;
}

.user-info p,
.account-info p {
    width: 100%;
    margin: 5px 0;
    color: black;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .card {
        flex-basis: calc(100% - 40px);
        max-width: calc(100% - 40px);
    }
}
</style>
