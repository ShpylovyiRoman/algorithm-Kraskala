'use strict';

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
  multi(num) {
    this.matrix = multMatrix(num, this.matrix);
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

//Get random number
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Creating random square matrix
function weightMatrix(dimensionOfMatrix) {
  const matrix = [];
  for (let i = 0; i < dimensionOfMatrix; i++) {
    const row = [];
    for (let j = 0; j < dimensionOfMatrix; j++) {
      const random = getRandom(10, 99);
      row.push(random);
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
  for (let i = 0; i < symetricMatrix.length; i++) {
    for (let j = 0; j < symetricMatrix.length; j++) {
      if (symetricMatrix[i][j] !== symetricMatrix[j][i]) {
        symetricMatrix[i][j] = symetricMatrix[j][i];
      }
    }
  }
  return symetricMatrix;
}

//Creating empty matrix
function zerosMatrix(dimensionOfMatrix) {
  const zeroMatrix = Array(dimensionOfMatrix)
    .fill(Array(dimensionOfMatrix)
    .fill(0))
    .map(a => a.slice())
  return zeroMatrix;
}

//Function for transponation matrix
const transpose = m => m[0].map((x,i) => m.map(x => x[i]))

//Function to multiply by number
function multMatrix(num, A) {
  const m = A.length;
  const n = A[0].length;
  const B = [];
  for (let i = 0; i < m; i++) {
    B[i] = [];
    for (let j = 0; j < n; j++) B[i][j] = num * A[i][j];
  }
  return B;
}

function multiplyMatrix(A, B) {
  const rowsA = A.length,
        colsA = A[0].length,
        rowsB = B.length,
        colsB = B[0].length,
        C = [];
  if (colsA !== rowsB) return false;
  for (let j = 0; j < rowsA; j++) C[j] = [];
  for (let k = 0; k < colsB; k++) {
    for (let i = 0; i < rowsA; i++) {
      let t = 0;
      for (let j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
      C[i][k] = t;
    }
  }
  return C;
}

function matrixPow(n, A) {
  if (n === 1) return A;
  else return multiplyMatrix(A, matrixPow(n - 1, A));
}

module.exports = Matrix;
