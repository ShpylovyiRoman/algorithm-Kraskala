'use strict';
const Matrix = require('./matrix.js');
const algorithmKraskal = require('./baseOfGraph.js');

//Function for finding lead time
function timeTester(matrix, times) {
  const startTest = new Date().getTime();
  let sumTime = 0;
  for (let i = 1; i <= times; i++) {
    const start = new Date().getTime();
    algorithmKraskal(matrix);
    const end = new Date().getTime();
    const runningTime = end - start;
    sumTime = sumTime + runningTime;
  }
  const endTest = new Date().getTime();
  const testTime = endTest - startTest;
  const averageTime = sumTime / times;
  console.log(`Average time for one iteration: ${averageTime}ms`);
  return testTime;
}
module.exports = timeTester;

// //Usage
const dimensionMatrix = 150;
const times = 100;

const matrixGraph = new Matrix(dimensionMatrix);
matrixGraph
  .fillWeight()
  .symetric()
  .zerosDiagonal();

const result = timeTester(matrixGraph.matrix, times);
console.log(`Time for 100 iterations of the function: ${result}ms`);
