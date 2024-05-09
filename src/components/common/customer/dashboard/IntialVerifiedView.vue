<template>
    <div>
        <br>
        <br>
        <div class="containerAction">
            <div class="cardAction">
                <h1>Welcome, {{ userData[0].firstName }} {{ userData[0].lastName }}</h1>
            </div>
        </div>
        <div class="container">
            <div v-for="(user, index) in userData" :key="index" class="card">
                <div class="account-info">
                    <h3>{{ user.accountType }} Account</h3>
                    <p><strong>IBAN:</strong> {{ user.IBAN }}</p>
                    <p><strong>Balance:</strong> {{ user.currency }} {{ user.balance }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "IntialVerifiedView",
    props: {
        userData: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.containerAction, .container, .cardAction, .card, p, h1, h3{
    color: black;
}
.containerAction {
    display: flex;
    justify-content: center;
    padding: 20px;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: center; 
    padding: 20px;
}

.cardAction {
    margin: 20px;
    padding: 20px;
    width: 100%;
    max-width: 600px;
    text-align: center;
}

.card {
    background-color: #f9f9f9;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    
}

.account-info {
    color: black;
}
</style>
