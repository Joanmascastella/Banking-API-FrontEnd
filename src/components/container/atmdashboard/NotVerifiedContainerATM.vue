<template>
    <div class="container">
        <NotVerifiedViewATM v-if="user" :user="user" />
    </div>
</template>

<script>
import NotVerifiedViewATM from "../../common/atm/dashboard/NotVerifiedViewATM.vue";
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import { onMounted, ref } from 'vue';

export default {
    name: "NotVerifiedContainerATM",
    components: {
        NotVerifiedViewATM
    },
    setup() {
        const customerStore = useCustomerGETAPICalls();
        const user = ref(null);

        onMounted(async () => {
            const response = await customerStore.getUserDetails();
            if (response.success) {
                user.value = response.data;
            } else {
                console.error(response.message);
            }
        });

        return { user };
    }
}
</script>

<style scoped>
</style>
