var assert = require('assert');

module.exports = Solver;

function Solver(options) {
  if (! this instanceof Solver)
    return new Solver(options);

  assert(typeof this.random === 'function', 'random() must be implemented');
  assert(typeof this.reproduct === 'function', 'reproduct() must be implemented');
  assert(typeof this.evaluate === 'function', 'evaluate() must be implemented');

  assert(options, 'need options');
  assert(options.populationSize, 'need options.populationSize');
  assert(typeof options.populationSize === 'number', 'options.populationSize must be a number');
  assert(options.populationSize > 0, 'options.populationSize must be > 0');
  assert(options.maxGenerations, 'need options.maxGenerations');
  assert(typeof options.maxGenerations === 'number', 'options.maxGenerations must be a number');
  assert(options.maxGenerations > 0, 'options.maxGenerations must be > 0');
  assert(options.decimation, 'need options.decimation');
  assert(typeof options.decimation === 'number', 'options.decimation must be a number');
  assert(options.decimation > 0 && options.decimation < 1, 'options.decimation must be between 0.0 and 1.0');

  this.options = options;
}

function fitnessSort(a, b) {
  return b.fitness - a.fitness;
}

Solver.prototype.getPopulation = getPopulation;
function getPopulation() {
  this.population.sort(fitnessSort);
  return this.population;
}

Solver.prototype.best = best;
function best() {
  this.population.sort(fitnessSort);
  return this.population[0];
}

Solver.prototype.run = run;
function run() {
  this.createInitialPopulation();
  this.generations = 0;

  while (this.generations < this.options.maxGenerations) {
    this.decimate();
    this.breed();
    this.generations++;
  }
}

Solver.prototype.createInitialPopulation = createInitialPopulation;
function createInitialPopulation(){
  this.population = [];

  for(var i = 0; i < this.options.populationSize; ++i)
    this.add(this.random());
}

Solver.prototype.decimate = decimate;
function decimate() {
  this.population.sort(fitnessSort);
  var length = this.population.length;
  var kill = Math.round(this.options.decimation * length);
  this.population = this.population.slice(0, length - kill);
}

Solver.prototype.breed = breed;
function breed() {
  while (this.population.length < this.options.populationSize)
    this.add(this.reproduct(this.select(), this.select()));
}

Solver.prototype.add = add;
function add(gene) {
  var fitness = this.evaluate(gene);
  var specimen = { fitness: fitness, gene: gene };
  this.population.push(specimen);
}

Solver.prototype.select = select;
function select() {
  var index = Math.floor(this.population.length * Math.random());
  return this.population[index].gene;
}
