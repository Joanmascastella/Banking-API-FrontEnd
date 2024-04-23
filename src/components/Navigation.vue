<template>

</template>

<script>
import { useAuthStore } from '@/store/auth.js';
import { useRouter } from 'vue-router';

export default {
    name: "Navigation",
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        const logout = () => {
            authStore.logout();
            router.push('/');
        };

        return { authStore, logout };
    },
};
</script>

<style scoped>

</style>