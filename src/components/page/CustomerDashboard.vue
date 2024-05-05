<template>
    <div v-if="approved">
        <!-- here call the components that an verfied user can access -->
    </div>
    <div v-else>
        <!-- here call the components that a non verified user can access -->
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import { computed, onMounted } from 'vue';

export default {
    name: "CustomerDashboard",
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
