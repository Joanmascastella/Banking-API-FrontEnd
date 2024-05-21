<template>
    <div>
        <IntialVerifiedView v-if="userData.length" :userData="userData"/>
    </div>
</template>

<script>
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import IntialVerifiedView from "../../common/customer/dashboard/IntialVerifiedView.vue";
import { onMounted } from 'vue';

export default {
    name: "VerifiedContainer",
    components: {
        IntialVerifiedView
    },
    setup() {
        const customerStore = useCustomerGETAPICalls();

        onMounted(async () => {
            const response = await customerStore.getUserAccountDetails();
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
