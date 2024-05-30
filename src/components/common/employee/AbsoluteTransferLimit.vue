<template>
    <div class="popup-container">
        <div class="popup">
            <h2>Set absolute Transfer Limit</h2>
            <div class="input-group">
                <label for="absoluteLimit">Absolute Transfer Limit</label>
                <input type="number" v-model="formData.absoluteLimit" name="absoluteLimit" id="absoluteLimit">
            </div>
            <div class="button-group">
                <button id="btn-update" @click="update" :disabled="!validForm">Update</button>
                <button id="btn-cancel" @click="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AbsoluteTransferLimit",
    props: {
        absoluteLimit: Number
    },
    data() {
        return {
            formData: {
                absoluteLimit: this.absoluteLimit
            }
        };
    },
    computed: {
        validForm() {
            return this.formData.absoluteLimit !== undefined && this.formData.absoluteLimit !== ""
        }
    },
    methods: {
        update() {
            this.$emit('updateLimit', this.formData.absoluteLimit);
        },
        cancel() {
            this.$emit('cancel');
        }
    }
}
</script>

<style scoped>
.popup {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
}
h2 {
    margin-bottom: 20px;
    color: #333;
}

.input-group {
    margin-bottom: 20px;
    text-align: left;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.input-group input {
    width: calc(100% - 10px);
    padding: 8px;
    border: none;
    border-radius: 5px;
    background-color: #ebe9e9;
    color: darkslategrey;
    box-sizing: border-box;
}

.button-group button {
    margin: 0 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button-group button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

#btn-cancel {
    background-color: red;
}

#btn-cancel:hover {
    background-color: darkred;
}

#btn-update {
    background-color: green;
}

#btn-update:hover {
    background-color: darkgreen;
}

.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
}
</style>