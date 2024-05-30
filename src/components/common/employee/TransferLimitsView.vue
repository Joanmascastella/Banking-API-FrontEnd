<template>
    <div class="popup-container">
        <div class="popup">
            <h2>Set transfer limits</h2>
            <div class="input-group">
                <label for="dailyLimit">Daily Transfer Limit</label>
                <input type="number" v-model="formData.dailyLimit" name="dailyLimit" id="dailyLimit" required>
            </div>
            <div class="input-group" v-if="!editMode">
                <label for="absoluteLimitSavings">Absolute Transfer Limit (Savings Account)</label>
                <input type="number" v-model="formData.absoluteLimitSavings" name="absoluteLimitSavings" id="absoluteLimitSavings">
            </div>
            <div class="input-group" v-if="!editMode">
                <label for="absoluteLimitChecking">Absolute Transfer Limit (Checking Account)</label>
                <input type="number" v-model="formData.absoluteLimitChecking" name="absoluteLimitChecking" id="absoluteLimitChecking">
            </div>
            <div class="button-group">
                <button id="btn-confirm" @click="confirm" :disabled="!validForm">{{ editMode ? 'Update' : 'Confirm' }}</button>
                <button id="btn-cancel" @click="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TransferLimitsView",
    props: {
        editMode: Boolean,
        dailyLimit:{
          type: Number,
          required: true,
        },
        absoluteLimitSavings: Number,
        absoluteLimitChecking: Number
   },
   data() {
    return {
      formData: {
        dailyLimit: this.dailyLimit ,
        absoluteLimitSavings: this.absoluteLimitSavings,
        absoluteLimitChecking: this.absoluteLimitChecking
      }
    };
    },
  computed: {
    validForm() {
      console.log(this.formData);
        if(!this.editMode){
          return this.formData.dailyLimit !== null && this.formData.dailyLimit > 0 &&
               this.formData.absoluteLimitSavings !== undefined &&
               this.formData.absoluteLimitSavings !== "" &&
               this.formData.absoluteLimitChecking !== undefined &&
               this.formData.absoluteLimitChecking !== "";
      } else {
          return this.formData.dailyLimit != null && this.formData.dailyLimit != "" && this.formData.dailyLimit > 0;
        }
      }
    },
   methods: {
    confirm() {
        if (this.editMode) {
        this.$emit('edit-limit', this.formData.dailyLimit);
      } else {
        this.$emit('confirm', this.formData);
      }
    },
    cancel() {
        this.$emit('cancel');
    }
   },
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

#btn-cancel:hover{
  background-color: darkred;
}

#btn-confirm {
  background-color: green;
}
#btn-confirm:hover {
  background-color: darkgreen;
}
.popup-container{
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