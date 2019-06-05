'use strict';

//Get random number
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Creating random square matrix
function weightMatrix(dimensionOfMatrix) {
  const matrix = [];
  for (let i = 0; i < dimensionOfMatrix; i++) {
    const row = new Uint8Array(dimensionOfMatrix);
    for (let j = 0; j < dimensionOfMatrix; j++) {
      const random = getRandom(10, 99);
      row[j] = random;
    }
    matrix.push(row);
  }
  return matrix;
}

//Function that puts zeros diagonally
function zeroDiagonal(matrix) {
  const newMatrix = matrix;
  for (let i = 0; i < matrix.length; i++) {
    newMatrix[i][i] = 0;
  }
  return newMatrix;
}

//Function that make symetric matrix
function symetric(inputMatrix) {
  const symetricMatrix = inputMatrix;
  for (let i = 1; i < symetricMatrix.length - 1; i++) {
    for (let j = 0; j < symetricMatrix.length; j++) {
      symetricMatrix[i][j] = symetricMatrix[j][i];
    }
  }
  return symetricMatrix;
}

// function symetric(inputMatrix) {
//   const symetricMatrix = inputMatrix;
//   for (let i = 0; i < symetricMatrix.length; i++) {
//     let row = symetricMatrix[i];
//     for (let j=i; j<symetricMatrix.length; j++){
//       symetricMatrix[j][i]=row[j]
//     }
//   }
//   return symetricMatrix;
// }

//Creating empty matrix
function zerosMatrix(dimensionOfMatrix) {
  const zeroMatrix = Array(dimensionOfMatrix)
    .fill(new Uint8Array(dimensionOfMatrix))
    .map(a => a.slice());
  return zeroMatrix;
}

//Function for transponation matrix
const transpose = m => m[0].map((x, i) => m.map(x => x[i]));

//Function for multiply two matrixes
function multiplyMatrix(A, B) {
  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;
  const C = [];
  if (colsA !== rowsB) return false;
  for (let j = 0; j < rowsA; j++) C[j] = new Uint8Array(rowsA);
  for (let k = 0; k < colsB; k++) {
    for (let i = 0; i < rowsA; i++) {
      let t = 0;
      for (let j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
      C[i][k] = t;
    }
  }
  return C;
}

function matrixPow(n, matrix) {
  if (n === 1) return matrix;
  return multiplyMatrix(matrix, matrixPow(n - 1, matrix));
}

const Matrix = class Matrix {
  constructor(dimension) {
    this.dimension = dimension;
    this.matrix = zerosMatrix(this.dimension);
  }
  fillWeight() {
    this.matrix = weightMatrix(this.dimension);
    return this;
  }
  zerosDiagonal() {
    this.matrix = zeroDiagonal(this.matrix);
    return this;
  }
  symetric() {
    this.matrix = symetric(this.matrix);
    return this;
  }
  transp() {
    this.matrix = transpose(this.matrix);
    return this;
  }
  multiply(B) {
    const result = multiplyMatrix(this.matrix, B.matrix);
    return result;
  }
  pow(n) {
    this.matrix = matrixPow(n, this.matrix);
    return this;
  }
};

module.exports = Matrix;
