'use strict';

const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm', '8pm'];
const table = document.getElementById('table-area');
const stores = [];

const Store = function(name, minHourlyCust, maxHourlyCust, avgCookiePerSale){
    this.name = name;
    this.minHourlyCust = minHourlyCust;
    this.maxHourlyCust = maxHourlyCust;
    this.avgCookiePerSale = avgCookiePerSale;
    this.dailySales = [];
    this.locationTotals = 0;
    stores.push(this);
};

/*********************************** Prototype Methods ***********************************************/
// function that generates a random number of custormers
Store.prototype.randomNumCustomer = function(){
    return Math.round(Math.random() * (this.maxHourlyCust - this.minHourlyCust) + this.minHourlyCust);
};
// function that calculates the number of cookies per hour based on a random num
Store.prototype.calcCookiesSales = function(){
    this.dailySales = hours.map(() => {
        return Math.floor(this.randomNumCustomer() * this.avgCookiePerSale);
    });
};
// function that calculates store totals
Store.prototype.calcStoreTotals = function(){
    this.dailySales.forEach((ele) => {
        this.locationTotals += ele;
    });
};
// function used to create a row of store data
Store.prototype.createTableRow = function(){
    const tr = document.createElement('tr');
    const locationCell = document.createElement('td');
    const th = document.createElement('th');
    th.textContent = this.name;
    table.appendChild(tr);
    tr.appendChild(th);

    this.dailySales.forEach((element) => {
        let td = document.createElement('td');
        td.textContent = element;
        tr.appendChild(td);
    });

    // get location totals
    this.calcStoreTotals();
    locationCell.textContent = this.locationTotals;
    tr.appendChild(locationCell);
};
// function that renders data
Store.prototype.render = function(){
    // calculate sales
    this.calcCookiesSales();
    // create row
    this.createTableRow();
};
/***********************************************************************************************/


// configure table
const configureTable = function(){
    const tHead = document.createElement('thead');
    table.appendChild(tHead);
    const tr = document.createElement('tr');
    tHead.appendChild(tr);
    const th = document.createElement('th');
    th.textContent = '';
    tr.appendChild(th);
    hours.forEach((ho) => {
        let th = document.createElement('th');
        th.textContent = ho;
        tr.appendChild(th);
    });
    var th2 = document.createElement('th');
    th2.textContent = 'Daily Location Total';
    tr.appendChild(th2);
};

// create store instances
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);


function renderTable() {
    stores.forEach((location) => {
        location.render();
    });
}


// render table
configureTable();
renderTable();
