<template>
    <div class="container">
        
        <div v-if="userData.username" class="card" style="color: black;">
            <p><strong>Username:</strong> {{ userData.username }}</p>
            <p><strong>Email:</strong> {{ userData.email }}</p>
            <p><strong>Name:</strong> {{ userData.firstName }} {{ userData.lastName }}</p>
            <p><strong>BSN:</strong> {{ userData.BSN }}</p>
            <p><strong>Phone:</strong> {{ userData.phoneNumber }}</p>
            <p><strong>Birth Date:</strong> {{ userData.birthDate }}</p>
            <p><strong>IBAN:</strong> {{ userData.IBAN }}</p>
            <p><strong>Currency:</strong> {{ userData.currency }}</p>
            <p><strong>Account Type:</strong> {{ userData.accountType }}</p>
            <p><strong>Balance:</strong> €{{ userData.balance }}</p>
            <p><strong>Absolute Limit:</strong> €{{ userData.absoluteLimit }}</p>
            <button @click="goBack" class="back-button">Back</button>
        </div>
        <div v-else>
            <p>Loading or no data available...</p>
        </div>
    </div>
</template>

<script>
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; 

export default {
    name: "AccountDetails",
    setup() {
        const userData = ref({});
        const customerGetAPICalls = useCustomerGETAPICalls();
        const router = useRouter();

        async function getAccountDetails() {
            const result = await customerGetAPICalls.getUserAccountDetails();
            console.log('API Data:', result);
            if (result.success && result.data) {
                userData.value = result.data[0];
                console.log('Set userData:', userData.value);
            } else {
                console.error("Failed to fetch account details", result.message);
            }
        }

        function goBack() {
            router.push("/");
        }

        onMounted(getAccountDetails);

        return { userData, goBack };
    }
}
</script>


<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.back-button {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #ff0000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.card {
    background-color: #f9f9f9;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card p {
    margin: 10px 0;
    color: black;
}
</style>
