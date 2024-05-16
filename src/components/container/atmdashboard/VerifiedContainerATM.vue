<template>
    <div>
        <VerifiedViewATM v-if="userData.length" :userData="userData"/>
    </div>
</template>

<script>
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import VerifiedViewATM from "../../common/atm/dashboard/VerifiedViewATM.vue";
import { onMounted, ref } from 'vue';

export default {
    name: "VerifiedContainerATM",
    components: {
        VerifiedViewATM
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