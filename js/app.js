'use strict';

const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm', '8pm'];

// Avaliable stores
const pike = {
    name: '1st and Pike',
    minHourlyCust: 23,
    maxHourlyCust: 65,
    avgCookiePerSale: 6.3,
    dailySales: [],

    // function that generates a random number of custormers
    randomNumCustomer: function (){
        return Math.floor(Math.random() * (this.maxHourlyCust - this.minHourlyCust) + this.minHourlyCust);
    },

    // function that calculates the number of cookies per hour based on a random num
    calcCookiesSales: function (){
        this.dailySales = hours.map(() => {
            return Math.floor(this.randomNumCustomer() * this.avgCookiePerSale)
        })
    },

    renderSales: function() {

    }

};
const airport = {};
const center = {};
const hill = {};
const alki = {};