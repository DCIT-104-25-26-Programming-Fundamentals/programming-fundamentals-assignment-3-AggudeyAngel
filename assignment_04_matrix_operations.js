// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, columns) {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        const rowInput = readlineSync.question(`Enter row ${i + 1}: `);
        const row = rowInput.split(' ').map(Number);
        matrix.push(row);
    }

    return matrix;
}

function displayMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let rowLine = '';

        for (let j = 0; j < matrix[i].length; j++) {
            rowLine += matrix[i][j].toString().padStart(5, ' ');
        }

        console.log(rowLine);
    }
}

function transposeMatrix(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const transposed = [];

    for (let col = 0; col < columns; col++) {
        const newRow = [];

        for (let row = 0; row < rows; row++) {
            newRow.push(matrix[row][col]);
        }

        transposed.push(newRow);
    }

    return transposed;
}

function addMatrices(matrixA, matrixB) {
    const result = [];

    for (let i = 0; i < matrixA.length; i++) {
        const newRow = [];

        for (let j = 0; j < matrixA[i].length; j++) {
            newRow.push(matrixA[i][j] + matrixB[i][j]);
        }

        result.push(newRow);
    }

    return result;
}

function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const columnsA = matrixA[0].length;
    const columnsB = matrixB[0].length;
    const result = [];

    for (let i = 0; i < rowsA; i++) {
        const newRow = [];

        for (let j = 0; j < columnsB; j++) {
            let sum = 0;

            for (let k = 0; k < columnsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }

            newRow.push(sum);
        }

        result.push(newRow);
    }

    return result;
}

function partATranspose() {
    const rows = readlineSync.questionInt('Enter number of rows: ');
    const columns = readlineSync.questionInt('Enter number of columns: ');
    const matrix = readMatrix(rows, columns);

    console.log('\nOriginal Matrix:');
    displayMatrix(matrix);

    const transposed = transposeMatrix(matrix);
    console.log('\nTransposed Matrix:');
    displayMatrix(transposed);
}

function partBAddMatrices() {
    const rows = readlineSync.questionInt('Enter number of rows: ');
    const columns = readlineSync.questionInt('Enter number of columns: ');

    console.log('Enter Matrix A:');
    const matrixA = readMatrix(rows, columns);

    console.log('Enter Matrix B:');
    const matrixB = readMatrix(rows, columns);

    console.log('\nMatrix A:');
    displayMatrix(matrixA);

    console.log('\nMatrix B:');
    displayMatrix(matrixB);

    const result = addMatrices(matrixA, matrixB);
    console.log('\nResult Matrix:');
    displayMatrix(result);
}

function partCMultiplyMatrices() {
    const rowsA = readlineSync.questionInt('Enter number of rows for Matrix A: ');
    const columnsA = readlineSync.questionInt('Enter number of columns for Matrix A: ');
    const rowsB = readlineSync.questionInt('Enter number of rows for Matrix B: ');
    const columnsB = readlineSync.questionInt('Enter number of columns for Matrix B: ');

    if (columnsA !== rowsB) {
        console.log('Error: The number of columns in Matrix A must equal the number of rows in Matrix B.');
        return;
    }

    console.log('Enter Matrix A:');
    const matrixA = readMatrix(rowsA, columnsA);

    console.log('Enter Matrix B:');
    const matrixB = readMatrix(rowsB, columnsB);

    console.log('\nMatrix A:');
    displayMatrix(matrixA);

    console.log('\nMatrix B:');
    displayMatrix(matrixB);

    const result = multiplyMatrices(matrixA, matrixB);
    console.log('\nResult Matrix:');
    displayMatrix(result);
}

function main() {
    while (true) {
        console.log('============================');
        console.log('   MATRIX OPERATIONS');
        console.log('============================');
        console.log('1. Transpose a Matrix');
        console.log('2. Add Two Matrices');
        console.log('3. Multiply Two Matrices');
        console.log('4. Quit');

        const choice = readlineSync.question('Select an operation (1-4): ');

        if (choice === '1') {
            partATranspose();
        } else if (choice === '2') {
            partBAddMatrices();
        } else if (choice === '3') {
            partCMultiplyMatrices();
        } else if (choice === '4') {
            console.log('Goodbye!');
            break;
        } else {
            console.log('Invalid choice. Please enter a number from 1 to 4.');
        }

        console.log();
    }
}

main();

