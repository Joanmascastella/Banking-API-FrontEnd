<script setup>
import { RouterView, RouterLink } from "vue-router";
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"


</script>

<template>
<main class="container">
 <Navigation/>
    <RouterView></RouterView>
     <Footer/>

</main>
    
</template>

<style scoped>

main {min-height:100vh;
min-width:100vw;}

</style>