<template>
    <div class="wrapper">
        <div class="container">
            <h1>Welcome, {{ user.firstName }} {{ user.lastName }}</h1>
            <h3>Sadly, your account has not yet been approved by one of our employees.</h3>
            <h3>To proceed using our services, please check back later.</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotVerifiedViewATM",
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    max-width: 600px; 
    background: white;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.container h1, h3 {
    color: black;
}

.container h3{
    font-weight: lighter;
}
</style>