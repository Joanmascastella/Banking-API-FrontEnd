<template>
    <div v-if="approved">
        <VerifiedContainerATM />
    </div>
    <div v-else>
        <NotVerifiedContainerATM />
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import { computed, onMounted } from 'vue';
import NotVerifiedContainerATM from '../../components/container/atmdashboard/NotVerifiedContainerATM.vue';
import VerifiedContainerATM from '../../components/container/atmdashboard/VerifiedContainerATM.vue';

export default {
    name: "ATMDashboard",
    components: {
        NotVerifiedContainerATM,
        VerifiedContainerATM
    },
    setup() {
        const authStore = useAuthStore();
        const approved = computed(() => authStore.isUserApproved);

        onMounted(() => {
            authStore.checkUser();
        });

        return { approved };
    },
}
</script>

<style scoped>

</style>
