

<template>

<div class="content">
    <h2> Dashboard</h2>
        <div class="grid">

            <div> <img src="../../assets/img/bank-account.png">
            <router-link :to="{ path : '/customerAccounts' }">
                <button>Accounts</button>
                </router-link>

         </div>

        <div><img src="../../assets/img/transactions.png">
        <router-link :to="{ path : '/transactions' }">
            <button>Transactions</button>
            </router-link>
        </div>

    </div>
</div>
</template>

<style scoped>

h2 {margin-top: 20vh;
text-align:center;}

.content {
min-height:100vh;
display:flex;
align-items:center;
flex-direction:column;

}

img {border: solid;
border-bottom:none;
border-color:orange;
padding: 5px;
width:100%;
}

button {width: 100%;
color:#0BCA48;
background-color:#055A0E;}
</style>