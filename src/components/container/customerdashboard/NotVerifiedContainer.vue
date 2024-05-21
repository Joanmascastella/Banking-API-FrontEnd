<template>
    <div class="container">
        <NotVerifiedView v-if="userData.length" :user="userData" />
    </div>
</template>

<script>
import NotVerifiedView from "../../common/customer/dashboard/NotVerifiedView.vue";
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import { onMounted } from 'vue';

export default {
    name: "NotVerifiedContainer",
    components: {
        NotVerifiedView
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
