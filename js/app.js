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
        // calculate sales
        this.calcCookiesSales();

        //attaching store name
        var h2 = document.createElement('h2');
        h2.textContent = this.name;
        var main = document.getElementById('main-area');
        main.appendChild(h2);

        //attaching li to list
        var ul = document.createElement('ul');
        hours.forEach((element, index) => {
            var li = document.createElement('li');
            li.textContent = element + ': ' + this.dailySales[index] + ' cookies';
            ul.appendChild(li);
        })

        //attaching total sales to daily sales
        var totalSales = 0;
        this.dailySales.forEach((ele) => {
            totalSales += ele;
        })
        var li = document.createElement('li');
        li.textContent = 'Total Sales: ' + totalSales + ' cookies';
        ul.appendChild(li);

        //Append ul to the dom
        main.appendChild(ul);
    }

};
const airport = {};
const center = {};
const hill = {};
const alki = {};

// create pike store
pike.renderSales();