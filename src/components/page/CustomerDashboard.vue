<template>
    <br>
    <br>
    <br>
    <br>
    <br>

    <br>
    <br>

    <br>
    <br>

    <div v-if="approved">
        <h1>user approved</h1>
    </div>
    <div v-else>
        <h1>user not approved</h1>
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
