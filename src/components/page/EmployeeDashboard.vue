<script setup>
import { defineComponent } from 'vue';
import Dashboard from "../common/Dashboard.vue";

defineComponent({
    name: 'EmployeeDashboard',
    components: {
        Dashboard
    }
});
</script>

<template>
    <Dashboard />
</template>
