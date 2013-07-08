function evaluate(gene) {
  var board = gene;
  var threats = 0;

  var i, j;
  for(i = 0; i < board.length; ++i)
    for(j = 0; j < board.length; ++j)
      if (mutualThreat(board, i, j))
        ++threats;

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

function zeroes(n) {
  var a = new Array(n);
  for (var i = 0; i < n; ++i)
    a[i] = 0;
  return a;
}

var i;
for (i = 1; i < 10; ++i)
  console.log(i, evaluate(zeroes(i)), i * (i - 1))

console.log(evaluate([0, 2, 0]))