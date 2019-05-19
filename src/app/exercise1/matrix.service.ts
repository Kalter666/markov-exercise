import { Injectable } from '@angular/core';

import { MatrixBase } from './matrix-base';

export const INITIAL_MATRIX: number[][] = [
  [0.6, 0.2, 0.1, 0.1, 0],
  [0.7, 0.1, 0.1, 0.1, 0],
  [0.4, 0.3, 0.1, 0.1, 0.1],
  [0.3, 0.2, 0.2, 0.1, 0.2],
  [0, 0, 0, 0, 1],
];

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  initial = INITIAL_MATRIX;

  constructor() { }

  getVals() {
    const matrix: MatrixBase<any>[][] = [];
    const initial: any = this.initial;

    for (let i = 0; i < initial.length; i++) {
      const row: any[] = [];
      for (let j = 0; j < initial[i].length; j++) {
        const val = {
          key: `${i}${j}`,
          value: `${initial[i][j]}`
        };
        row.push(val);
      }
      matrix.push(row);
    }

    return matrix;
  }

  toMatrix(vals): number[][] {
    const matrix: number[][] = [];
    const initial: any = this.initial;

    for (let i = 0; i < initial.length; i++) {
      const row: any[] = [];
      for (let j = 0; j < initial[i].length; j++) {
        const val = +vals[`${i}${j}`];
        row.push(val);
      }
      matrix.push(row);
    }

    return matrix;
  }

  getSumOfRows(matrix: number[][]) {
    const sum: number[] = [];
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    matrix.forEach(row => {
      sum.push(+row.reduce(reducer).toFixed(3));
    });
    return sum;
  }
}
