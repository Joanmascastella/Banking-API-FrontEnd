import { defineStore } from 'pinia'



export const transactionReport = defineStore('transactionReport', {
    state() {
        return {

        };
    },

    actions: {

        retrieveCount(data) {
            let count=0;
            data.forEach((item) => { 
                count+=1;
            });

            return count;
        },
        retrieveMinimumAmount(data) {
            let minimumAmount = data[0].amount;
            data.forEach((item) => { if (item.amount < minimumAmount){
                minimumAmount = item.amount;}
            });
            return minimumAmount;
        },
        retrieveMaximumAmount(data) {
            let maximumAmount = data[0].amount;
            data.forEach((item) => { if (item.amount > maximumAmount){
                maximumAmount = item.amount;}
            });
            return maximumAmount;
        },
        retrieveTotalAmount(data) {
            let totalAmount = 0;
            data.forEach((item) => { 
                totalAmount+=item.amount;
            });
            return totalAmount;
        },
        retrieveATMWithdrawalsCount(data) {
            let ATMWithdrawalsCount = 0;
            data.forEach((item) => { if (item.fromAccount === 'ATM'){
                ATMWithdrawalsCount+=1;}
            });
            return ATMWithdrawalsCount;
        },
        retrieveATMDepositsCount(data) {
            let ATMDepositsCount = 0;
            data.forEach((item) => { if (item.toAccount === 'ATM'){
                ATMDepositsCount+=1;}
            });
            return ATMDepositsCount;
        },
        retrieveATMWithdrawalsAmount(data) {
            let ATMWithdrawalsAmount = 0;
            data.forEach((item) => { if (item.fromAccount === 'ATM'){
                ATMWithdrawalsAmount+=item.amount;}
            });
            return ATMWithdrawalsAmount;
        },
        retrieveATMDepositsAmount(data) {
            let ATMDepositsAmount = 0;
            data.forEach((item) => { if (item.toAccount === 'ATM'){
                ATMDepositsAmount+=item.amount;}
            });
            return ATMDepositsAmount;
        },

    }
});