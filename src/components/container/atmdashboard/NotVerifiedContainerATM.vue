<template>
    <div class="container">
        <NotVerifiedViewATM v-if="userData.length" :user="userData" />
    </div>
</template>

<script>
import NotVerifiedViewATM from "../../common/atm/dashboard/NotVerifiedViewATM.vue";
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import { onMounted } from 'vue';

export default {
    name: "NotVerifiedContainerATM",
    components: {
        NotVerifiedViewATM
    },
    setup() {
        const customerStore = useCustomerGETAPICalls();
        

        onMounted(async () => {
            const response = await customerStore.getUserDetails();
            if (!response.success) {
                console.error(response.message);
            }
        });

        return { userData: customerStore.getUserData };
    }
}
</script>

<style scoped>
</style>
