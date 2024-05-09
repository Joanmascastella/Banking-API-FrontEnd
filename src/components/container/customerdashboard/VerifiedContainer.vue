<template>
    <div>
        <IntialVerifiedView v-if="userData.length" :userData="userData"/>
    </div>
</template>

<script>
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import IntialVerifiedView from "../../common/customer/dashboard/IntialVerifiedView.vue";
import { onMounted, ref } from 'vue';

export default {
    name: "VerifiedContainer",
    components: {
        IntialVerifiedView
    },
    setup() {
        const customerStore = useCustomerGETAPICalls();
        const userData = ref([]); 

        onMounted(async () => {
            const response = await customerStore.getUserAccountDetails();
            if (response.success) {
                userData.value = response.data; 
            } else {
                console.error(response.message);
            }
        });

        return { userData };
    }
}
</script>

<style scoped>
</style>