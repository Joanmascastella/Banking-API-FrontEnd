<template>
    <div>
        <VerifiedViewATM v-if="userData.length" :userData="userData"/>
    </div>
</template>

<script>
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import VerifiedViewATM from "../../common/atm/dashboard/VerifiedViewATM.vue";
import { onMounted } from 'vue';

export default {
    name: "VerifiedContainerATM",
    components: {
        VerifiedViewATM
    },
    setup() {
        const customerStore = useCustomerGETAPICalls();

        onMounted(async () => {
            const response = await customerStore.getUserAccountDetails();
            if (!response.success) {
                console.error(response.message);
            }
        });

        return { userData: customerStore.getUserData};
    }
}
</script>

<style scoped>
</style>