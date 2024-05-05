import { defineStore } from 'pinia'



export const transactionReport = defineStore('transactionReport', {
    state() {
        return {
            report: new Map(),

        };
    },

    actions: {

        retrieveCount(data) {
            let count=0;
            data.forEach((item) => { 
                count+=1;
                this.report.set("count", count);});
        },
        retrieveMinimumAmount(data) {
            let minimumAmount = data[0].amount;
            data.forEach((item) => { if (item.amount < minimumAmount){
                minimumAmount = item.amount;}
                this.report.set("minimumAmount", minimumAmount);});
        },
        retrieveMaximumAmount(data) {
            let maximumAmount = data[0].amount;
            data.forEach((item) => { if (item.amount > maximumAmount){
                maximumAmount = item.amount;}
                this.report.set("maximumAmount", maximumAmount);});
        },
        retrieveTotalAmount(data) {
            let totalAmount = 0;
            data.forEach((item) => { 
                totalAmount+=item.amount;
                this.report.set("totalAmount", totalAmount);});
        },
        retrieveATMWithdrawalsCount(data) {
            let ATMWithdrawalsCount = 0;
            data.forEach((item) => { if (item.fromAccount === 'ATM'){
                ATMWithdrawalsCount+=1;}
                this.report.set("ATMWithdrawalsCount", ATMWithdrawalsCount);});
        },
        retrieveATMDepositsCount(data) {
            let ATMDepositsCount = 0;
            data.forEach((item) => { if (item.toAccount === 'ATM'){
                ATMDepositsCount+=1;}
                this.report.set("ATMDepositsCount", ATMDepositsCount);});
        },
        retrieveATMWithdrawalsAmount(data) {
            let ATMWithdrawalsAmount = 0;
            data.forEach((item) => { if (item.fromAccount === 'ATM'){
                ATMWithdrawalsAmount+=item.amount;}
                this.report.set("ATMWithdrawalsAmount", ATMWithdrawalsAmount);});
        },
        retrieveATMDepositsAmount(data) {
            let ATMDepositsAmount = 0;
            data.forEach((item) => { if (item.toAccount === 'ATM'){
                ATMDepositsAmount+=item.amount;}
                this.report.set("ATMDepositsAmount", ATMDepositsAmount);});
        },
        retrieveOnlineCustomerTransactionCount(data, users) {
            let customerTransactionsCount = 0;
            data.forEach((item, count) => { if (item.userId === users.data[count].id && users.data[count].userType === 'ROLE_CUSTOMER'){
                customerTransactionsCount+=1;}
                this.report.set("onlineCustomerTransactions", customerTransactionsCount);});
        },
        retrieveOnlineEmployeeTransactionCount(data, users) {
            let employeeTransactionsCount = 0;
            data.forEach((item, count) => { if (item.userId === users.data[count].id && users.data[count].type === 'ROLE_EMPLOYEE'){
                employeeTransactionsCount+=1;}
                this.report.set("onlineEmployeeTransactions", employeeTransactionsCount);});
        },
        retrieveOnlineCustomerTransactionsAmount(data, users) {
            let amount = 0;
            data.forEach((item, count) => { if (item.userId === users.data[count].id && users.data[count].type === 'ROLE_CUSTOMER'){
                amount+=item.amount;}
                this.report.set("onlineCustomerTransactionsAmount", amount);});
        },
        retrieveOnlineEmployeeTransactionsAmount(data, users) {
            let amount = 0;
            data.forEach((item, count) => { if (item.userId === users.data[count].id && users.data[count].type === 'ROLE_EMPLOYEE'){
                amount+=item.amount;}
                this.report.set("onlineEmployeeTransactionsAmount", amount);});
        },
        
            persist: true,

      
    
    }
});