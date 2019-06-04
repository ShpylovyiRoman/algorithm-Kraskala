'use strict';

//connect  input module
const readlineSync = require('readline-sync');
const Matrix = require('./matrix.js');

//input validation function
function inputDataChecker() {
  let inputNumber = readlineSync.question(
    'How many nodes your graph will have? \n'
  );
  inputNumber = Number(inputNumber);
  if (typeof inputNumber === 'number' && inputNumber > 1) return inputNumber;
  console.log('Invalid input, please enter number above one. ');
  return inputDataChecker();
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


//Usage
const dimensionMatrix = inputDataChecker();
const matrixGraph = new Matrix(dimensionMatrix);
matrixGraph
  .fillWeight()
  .symetric()
  .zerosDiagonal();


console.log(matrixGraph.matrix)
const baseOfGraph = algorithmKraskal(matrixGraph.matrix);
console.log(baseOfGraph.matrix)

module.exports = algorithmKraskal;
