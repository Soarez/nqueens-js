#!/usr/bin/env node

var util = require('util');

module.exports = main;

if (require.main !== module)
  return;

if (process.argv.length < 4) {
  console.log('Usage: %s <boardSize> <maxGens>', process.argv[1]);
  return;
}

main(parseInt(process.argv[2]), parseInt(process.argv[3]), true);

function main(size, maxgen, log) {
  if (log)
    console.log('Running with size %s in %s generations.', size, maxgen);

  var NQueens = require('./nqueens');

  var solver = NQueens({ boardSize: size, maxGenerations: maxgen });

  solver.run();

  var best = solver.best();
  if (log)
    console.log('Best solution found: %s', JSON.stringify(best));

  // console.log('All solutions:');
  // for (var specimen in solver.getPopulation())
  //   console.log(specimen);

  var gene = best.gene;

  if (log)
    for(var i = 0; i < size; ++i)
      for(var j = 0; j < size; ++j)
        util.print('|'
          + (gene[i] === j ? 'Q' : ' ')
          + (j === size - 1 ? '|\n' : ''));
}

