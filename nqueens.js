var assert = require('assert');
var util = require('util');
var Solver = require('./solver');

module.exports = NQueens;

util.inherits(NQueens, Solver);
function NQueens(options) {
  if (! (this instanceof NQueens))
    return new NQueens(options);

  assert(options, 'need options');
  assert(options.boardSize, 'need options.boardSize');
  assert(options.maxGenerations, 'need options.maxGenerations');

  assert(options.boardSize % 5 === 0,
      'this implementation needs board sizes that are multiple of 5');

  options.populationSize = options.populationSize || 100;
  options.decimation = options.decimation || 0.2;

  Solver.call(this, options);
}

NQueens.prototype.random = random;
function random() {
  var gene = new Array(this.options.boardSize);
  var i, holder;

  // create identity array
  for(i = 0; i < gene.length; ++i)
    gene[i] = i;

  // randomly switch entries
  for(i = 0; i < gene.length; ++i) {
    j = Math.floor(Math.random() * gene.length);

    holder = gene[j];
    gene[j] = gene[i];
    gene[i] = holder;
  }

  return gene;
}

NQueens.prototype.reproduct = reproduct;
function reproduct(geneA, geneB) {
  assert(geneA instanceof Array, 'gene must be an array');
  assert(geneB instanceof Array, 'gene must be an array');
  assert(geneA.length === geneB.length, 'genes must be compatible');

  var size = geneA.length;
  var geneNew = new Array(size);
  var filled = new Array(size);

  var next = Math.floor(Math.random() * size);
  var i;

  while(! filled[next]) {
    geneNew[next] = geneA[next];
    filled[next] = true;

    for (i = 0; i < geneA.length; ++i)
      if (geneA[i] === geneB[next])
        break;

    next = i;
  }

  for(i = 0; i < size; ++i)
    if(! filled[i])
      geneNew[i] = geneB[i];

  return geneNew;
}

NQueens.prototype.evaluate = evaluate;
function evaluate(gene) {
  var board = gene;
  var threats = 0;

  var i, j;
  for(i = 0; i < board.length; ++i) {
    for(j = 0; j < board.length / 5; j += 5) {
      if (mutualThreat(board, i, j + 0)) ++threats;
      if (mutualThreat(board, i, j + 1)) ++threats;
      if (mutualThreat(board, i, j + 2)) ++threats;
      if (mutualThreat(board, i, j + 3)) ++threats;
      if (mutualThreat(board, i, j + 4)) ++threats;
    }
  }

  var maxThreats = board.length * (board.length - 1);
  var fitness = (maxThreats - threats) / maxThreats;

  return fitness;
}

function mutualThreat(board, columnA, columnB) {
    if (columnB === columnA)
      return false;

    // check for horizontal threat
    if (board[columnA] === board[columnB])
      return true;

    // check for diagonnal threat
    var former = Math.min(columnA, columnB);
    var latter = Math.max(columnA, columnB);
    if(Math.abs(board[latter] - board[former]) === latter - former)
      return true;
}

