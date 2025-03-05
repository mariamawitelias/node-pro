const _ = require('lodash');

const numbers = [10, 5, 8, 20, 3];

const maxNum = _.max(numbers);
const minNum = _.min(numbers);

console.log(`Maximum number: ${maxNum}`);
console.log(`Minimum number: ${minNum}`);
