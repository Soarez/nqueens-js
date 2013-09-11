#!/usr/bin/env node

var main = require('./main');
var size = 25;
var maxgen = 10000;
var start = Date.now();
main(size, maxgen);
var total = Date.now() - start;
console.log('Total seconds: %d', total / 1000);

