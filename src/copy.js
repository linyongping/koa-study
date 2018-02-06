const fs = require('fs');
const path = require('path');
const bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);

const pathname = '../package.json';
let dupBin = new Buffer(bin.length);
bin.copy(dupBin);
const factorial = n => {
  console.log('n', n);
  if (n === 1) {
    return n;
  } else {
    return n * factorial(n - 1);
  }
};

const result = factorial(9);
console.log('bin', result);
