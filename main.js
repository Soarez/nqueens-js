#!/usr/bin/env node

var util = require('util');

if (process.argv.length < 4) {
  console.log('Usage: %s <boardSize> <maxGens>', process.argv[1]);
  return;
}

size = parseInt(process.argv[2]);
maxgen = parseInt(process.argv[3]);

console.log('Running with size %s in %s generations.', size, maxgen);

var NQueens = require('./nqueens');

var solver = NQueens({ boardSize: size, maxGenerations: maxgen });

solver.run();

var best = solver.best();
console.log('Best solution found: %s', JSON.stringify(best));

// console.log('All solutions:');
// for (var specimen in solver.getPopulation())
//   console.log(specimen);

var gene = best.gene;

for(var i = 0; i < size; ++i)
  for(var j = 0; j < size; ++j)
    util.print('|'
      + (gene[i] === j ? 'Q' : ' ')
      + (j === size - 1 ? '|\n' : ''));
