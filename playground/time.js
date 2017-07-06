const moment = require('moment');

var date = moment();
date.add(0.5,'hour');
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));

// var date = new Date
// console.log(date.getMonth());
