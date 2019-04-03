'use strict';

const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm', '8pm'];
const table = document.getElementById('table-area');
const form  = document.getElementById('cookie-form');
const stores = [];

/********** Helper Function to create elements *******************/
const createTheElement = function(element, content, parent){
    const newEle = document.createElement(element);
    newEle.textContent = content;
    parent.appendChild(newEle);
};
/*****************************************************************/

const Store = function(name, minHourlyCust, maxHourlyCust, avgCookiePerSale){
    this.name = name;
    this.minHourlyCust = minHourlyCust;
    this.maxHourlyCust = maxHourlyCust;
    this.avgCookiePerSale = avgCookiePerSale;
    this.dailySales = [];
    this.locationTotals = 0;
    this.totalSalesPerHour = 0;
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
    table.appendChild(tr);
    createTheElement('th', this.name, tr);

    this.dailySales.forEach((element) => {
        createTheElement('td', element, tr);
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

// configure table (header row)
const configureTable = function(){
    const tHead = document.createElement('thead');
    table.appendChild(tHead);
    const tr = document.createElement('tr');
    tHead.appendChild(tr);
    createTheElement('th', '', tr);
    hours.forEach((ho) => {
        createTheElement('th', ho, tr);
    });
    createTheElement('th', 'Daily Location Total', tr);
};


// create store instances
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

//const locationArray = [pike, airport, center,hill,alki];

//function that creates the total cookie row (footer row)
var createTotalRow = function () {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    createTheElement('th', 'Total: ', tr);
    let hourlySales = 0;
    let totalHourlySales = 0;
    for (let i = 0; i < hours.length; i++) {
        for (var j = 0; j < stores.length; j++) {
            hourlySales += stores[j].dailySales[i];
        }
        createTheElement('td', hourlySales, tr);
        hourlySales = 0;
    }

    stores.forEach((location) => {
        totalHourlySales += location.locationTotals;
    });
    // add total for daily totals
    createTheElement('td', totalHourlySales, tr);
};


/************************* Form Event Handler **************************************/
function handleFormSubmit(event){
    event.preventDefault();
    const name = event.target.name.value;
    const minCustomer = event.target.minHourlyCustomers.value;
    const maxCustomer = event.target.maxHourlyCustomers.value;
    const avgSales = event.target.averageCookies.value;

    var newStore = new Store(name, minCustomer, maxCustomer, avgSales);
    console.log(newStore);
}

/**********************************************************************************/
function renderTable() {
    stores.forEach((location) => {
        location.render();
    });
}

// add event listener
form.addEventListener('submit', handleFormSubmit);

// render table
configureTable();
renderTable();
createTotalRow();
