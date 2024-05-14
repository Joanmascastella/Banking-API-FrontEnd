<template>
    <div class="container">
        <h1>Users</h1>
        <select v-model="selectedFilter">
            <option value="all">All Users</option>
            <option value="unapproved Users">Pending Users</option>
        </select>
    </div>
    <div>
        <UsersContainer :selectedFilter="selectedFilter"/>
    </div>
</template>

<script>
import UsersContainer from '../../container/employeedashboard/UsersContainer.vue';

export default {
    name: "UsersPage",
    components: {
       UsersContainer
    },
    data() {
        return {
            selectedFilter: 'all'
        };
    }
}
</script>

<style scoped>
    .container{
        margin-top: 10%;
    }
    select{
        background-color: #FCC26B;
        border: none;
        color: darkslategrey;
        width: 20%;
    }
    h1{
        text-align: center;
        color: darkslategrey
    }
</style>