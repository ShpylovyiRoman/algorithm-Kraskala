'use strict'


const dimensionMatrix = 50;
const dimensionBigMatrix = dimensionMatrix * 2;

const matrixGraph = new Matrix(dimensionMatrix);
matrixGraph
  .fillWeight()
  .symetric()
  .zerosDiagonal();
const secondMatrix = new Matrix(dimensionMatrix);
secondMatrix
  .fillWeight()
  .symetric()
  .zerosDiagonal();

const bigMatrixGraph = new Matrix(dimensionBigMatrix);
bigMatrixGraph
  .fillWeight()
  .symetric()
  .zerosDiagonal();
const bigMatrixSecondGraph = new Matrix(dimensionBigMatrix);
bigMatrixSecondGraph
  .fillWeight()
  .symetric()
  .zerosDiagonal();

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

[secondBaseBigMatrix, bigMatrixSecondTime] = timeTester(
  bigMatrixSecondGraph.matrix
);
// console.log(secondBaseBigMatrix.matrix);
console.log(`Running time for second big graph: ${bigMatrixSecondTime}ms`);
