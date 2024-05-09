<template>
    <div v-if="approved">
        <VerifiedContainer />
    </div>
    <div v-else>
        <NotVerifiedContainer />
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import { computed, onMounted } from 'vue';
import NotVerifiedContainer from '../../components/container/customerdashboard/NotVerifiedContainer.vue';
import VerifiedContainer from '../../components/container/customerdashboard/VerifiedContainer.vue';

export default {
    name: "CustomerDashboard",
    components: {
        NotVerifiedContainer,
        VerifiedContainer
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
