<script>
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"

export default {
   name: "App",
   components: {
      Navigation,
      Footer
   }
}


</script>

<template>
   <main class="container">
      <Navigation />
      <RouterView></RouterView>
      <Footer />
   </main>

</template>

<style scoped>
main {
   min-height: 100vh;
   min-width: 100vw;
}
</style>