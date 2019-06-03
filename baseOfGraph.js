'use strict';

//connect  input module
const readlineSync = require('readline-sync');
const Matrix = require('./matrix.js')

//input validation function
function inputDataChecker() {
  let inputNumber = readlineSync.question(
    'How many nodes your graph will have? \n'
  );
  inputNumber = Number(inputNumber);
  if (typeof inputNumber === 'number' && inputNumber > 1) return inputNumber;
  else {
    console.log('Invalid input, please enter number above one. ');
    return inputDataChecker();
  }
}

//creating class of edges
class Edge {
  constructor(start, end, weight) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}

//Factory that creates edges by weight matrix
function EdgesFactory(matrixGraph) {
  const edges = [];
  for (let i = 1; i <= matrixGraph.length; i++) {
    for (let j = 1; j <= matrixGraph.length; j++) {
      const line = matrixGraph[i - 1];
      const weight = line[j - 1];
      if (weight !== 0) {
        const value = new Edge(i - 1, j - 1, weight);
        edges.push(value);
      }
    }
  }
  return edges;
}

//Function for sort by weight
function compareWeight(edgeA, edgeB) {
  return edgeA.weight - edgeB.weight;
}

//Main function in Kraskal algorithm
function baseBuilderKraskal(edges, matrixSize) {
  const base = new Matrix(matrixSize);
  const passedNodes = {};
  while (Object.keys(passedNodes).length < matrixSize) {
    edges = edges.filter(() => true);
    const edge = edges.shift();
    const start = edge.start;
    const end = edge.end;
    const row = base.matrix[start];
    row[edge.end] = 1;
    base.matrix[start] = row;
    passedNodes[start] = 1;
    passedNodes[end] = 1;
    base.matrix[start] = row;
    for (let i = 0; i < edges.length; i++) {
      const currentEdge = edges[i];
      const currentStart = currentEdge.start;
      const currentEnd = currentEdge.end;
      if (passedNodes[currentStart] === 1 && passedNodes[currentEnd] === 1) {
        delete edges[i];
      }
    }
  }
  return base;
}

//Realization Kraskal algoritm
function algorithmKraskal(weightMatrix) {
  const matrixSize = weightMatrix[0].length;
  //Create edges
  const edges = EdgesFactory(weightMatrix);
  //Sort edges by weight
  edges.sort(compareWeight);
  //Find base of graph
  const baseMatrix = baseBuilderKraskal(edges, matrixSize);
  return baseMatrix;
}

//Function for finding lead time
function timeTester(matrix) {
  const start = new Date().getTime();
  const baseOfGraph = algorithmKraskal(matrix);
  const end = new Date().getTime();

  const runningTime = end - start;
  return [baseOfGraph, runningTime];
}

//Usage
const dimensionMatrix = inputDataChecker();
const dimensionBigMatrix = dimensionMatrix * 2;

const matrixGraph = new Matrix(dimensionMatrix);
  matrixGraph.fillWeight().symetric().zerosDiagonal();
const secondMatrix = new Matrix(dimensionMatrix);
  secondMatrix.fillWeight().symetric().zerosDiagonal();

const bigMatrixGraph = new Matrix(dimensionBigMatrix);
  bigMatrixGraph.fillWeight().symetric().zerosDiagonal();
const bigMatrixSecondGraph = new Matrix(dimensionBigMatrix);
  bigMatrixSecondGraph.fillWeight().symetric().zerosDiagonal();

// console.log('First matrix: \n')
// console.log(firstMatrixGraph.matrix);
// console.log('Second matrix: \n')
// console.log(secondMatrix.matrix);
// console.log('First big matrix: \n')
// console.log(bigMatrixGraph.matrix);
// console.log('Second big matrix: \n')
// console.log(bigMatrixSecondGraph.matrix);

//Finding lead time
let baseMatrix,
    firstTime,
    secondBaseMatrix,
    secondTime,
    bigBaseMatrix,
    bigMatrixTime,
    secondBaseBigMatrix,
    bigMatrixSecondTime;

[baseMatrix, firstTime] = timeTester(matrixGraph.matrix);
// console.log(baseMatrix.matrix);
console.log(`Running time for first graph: ${firstTime}ms`);

[secondBaseMatrix, secondTime] = timeTester(secondMatrix.matrix);
// console.log(secondBaseMatrix.matrix);
console.log(`Running time for second graph: ${secondTime}ms`);

[bigBaseMatrix, bigMatrixTime] = timeTester(bigMatrixGraph.matrix);
// console.log(bigBaseMatrix.matrix);
console.log(`Running time for big graph: ${bigMatrixTime}ms`);

[secondBaseBigMatrix, bigMatrixSecondTime] = timeTester(bigMatrixSecondGraph.matrix);
// console.log(secondBaseBigMatrix.matrix);
console.log(`Running time for second big graph: ${bigMatrixSecondTime}ms`);
