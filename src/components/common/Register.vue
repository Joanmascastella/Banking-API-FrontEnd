<template>
    <br>
    <div class="container">
        <form @submit.prevent="registerUser">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" v-model="user.username" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required v-model="user.email">

            <label for="fname">Firstname:</label>
            <input type="text" id="fname" name="fname" required v-model="user.firstName">

            <label for="lname">Lastname:</label>
            <input type="text" id="lname" name="lname" required v-model="user.lastName">

            <label for="bsn">BSN:</label>
            <div class="bsn-inputs">
                <input type="text" id="bsn-part1" name="bsn-part1" v-model="bsnPart1" @input="restrictLength($event, 4)" required>
                <span>.</span>
                <input type="text" id="bsn-part2" name="bsn-part2" v-model="bsnPart2" @input="restrictLength($event, 2)" required>
                <span>.</span>
                <input type="text" id="bsn-part3" name="bsn-part3" v-model="bsnPart3" @input="restrictLength($event, 3)" required>
            </div>

            <label for="">Phone Number:</label>
            <div class="phonenr-inputs">
                <label for="country-code" style="padding: auto; margin: 8px; font-weight: bold; font-size: 40px;">+</label>
                <input type="text" id="country-code" name="country-code" v-model="countryCode" @input="restrictLength($event, 4)" required>
                <span>-</span>
                <input type="text" id="pnumber" name="pnumber" v-model="phoneNumber" @input="restrictLength($event, 15)" required>
            </div>

            <label for="bdate">Birth Date:</label>
            <input type="date" id="bdate" name="bdate" required v-model="user.birthDate" :max="maxDate">

            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="user.password" required>

            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import { useCustomerPOSTAPICalls } from '@/stores/backend-calls-customer/customerPOSTAPICalls.js';
import Swal from 'sweetalert2';

export default {
    name: 'RegisterComponent',
    data() {
        const today = new Date();
        const minAdultAge = 18;
        const maxDate = new Date(today.getFullYear() - minAdultAge, today.getMonth(), today.getDate()).toISOString().split('T')[0];

        return {
            user: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                BSN: "",
                phoneNumber: "",
                birthDate: "",
                password: ""
            },
            bsnPart1: "",
            bsnPart2: "",
            bsnPart3: "",
            countryCode: "",
            phoneNumber: "",
            maxDate: maxDate
        }
    },
    methods: {
        updateBSN() {
            this.user.BSN = `${this.bsnPart1}.${this.bsnPart2}.${this.bsnPart3}`;
        },
        updatePhoneNumber() {
            this.user.phoneNumber = `+${this.countryCode} ${this.phoneNumber}`;
        },
        restrictLength(event, maxLength) {
            if (event.target.value.length > maxLength) {
                event.target.value = event.target.value.slice(0, maxLength);
            }
        },
        async registerUser() {
            const customerStore = useCustomerPOSTAPICalls();
            try {
                await customerStore.registerUser(this.user);
                Swal.fire({
                    title: 'Success!',
                    text: 'User registered successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                this.$router.push("/login");
            } catch (error) {
                console.error('Error registering user:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error registering the user.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    },
    watch: {
        bsnPart1: 'updateBSN',
        bsnPart2: 'updateBSN',
        bsnPart3: 'updateBSN',
        countryCode: 'updatePhoneNumber',
        phoneNumber: 'updatePhoneNumber'
    }
}
</script>

<style scoped>
.container {
    margin-top: 30px;
    max-width: 600px;
    margin: auto;
    padding: 2rem;
}

form {
    display: flex;
    flex-direction: column;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
    color: black;
    margin-top: 1rem;
}

input,
button {
    margin-top: 0.5rem;
}

button {
    margin-top: 1.5rem;
}

.bsn-inputs, .phonenr-inputs {
    display: flex;
    align-items: center;
}

.bsn-inputs span, .phonenr-inputs span {
    margin: 0 0.5rem;
}
</style>
