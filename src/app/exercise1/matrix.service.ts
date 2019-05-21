import { Injectable } from '@angular/core';
import { MathType, multiply, pow } from 'mathjs';

import { MatrixBase } from './matrix-base';

export const INITIAL_MATRIX: number[][] = [
  [0.6, 0.2, 0.1, 0.1, 0],
  [0.7, 0.1, 0.1, 0.1, 0],
  [0.4, 0.3, 0.1, 0.1, 0.1],
  [0.3, 0.2, 0.2, 0.1, 0.2],
  [0, 0, 0, 0, 1],
];

export const INITIAL_STATE_DISPERSION = [0.8, 0.2, 0, 0, 0];

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private initial = INITIAL_MATRIX;

  constructor() { }

  getVals(initial = this.initial) {
    const matrix: MatrixBase<any>[][] = [];

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

  matrixPow(matrix: number[][] | MathType, times: number) {
    return pow(matrix, times);
  }

  getDispersion(matrix: MathType, state: number, initialStateDispersion: number[]) {
    let stateDispersion = initialStateDispersion;
    let nthMatrix = matrix;
    const dispersions = [stateDispersion];

    for (let i = 1; i <= state; i++) {
      nthMatrix = this.matrixPow(matrix, i);
      stateDispersion = this.getNextDispersion(nthMatrix, initialStateDispersion);
      dispersions.push(stateDispersion);
    }

    return dispersions;
  }

  private getNextDispersion(matrix: MathType, stateDispersion: number[] | MathType): any {
    return multiply(stateDispersion, matrix);
  }

  private getPi1(p: any) {
    const top = +p['20'] * +p['40'];
    const bottom1 = +p['20'] * +p['41'];

    const bot1 = +p['12'] + +p['14'];
    const bot2 = +p['30'] + +p['32'] + +p['34'];

    const t1 = +p['20'] * +p['40'];
    const t2 = +p['12'] * +p['40'];
    const t3 = +p['14'] * +p['20'];
    const subBot1 = +p['01'] * (t1 + t2 + t3) / bot1;

    const t4 = +p['20'] * +p['40'];
    const t5 = +p['32'] * +p['40'];
    const t6 = +p['34'] * +p['20'];
    const subBot2 = +p['03'] * (t4 + t5 + t6) / bot2;

    const bottom = bottom1 + subBot1 + subBot2;
    return bottom / top;
  }

  private getPi2(p: any, pi1: number) {
    return pi1 * +p['01'] / (+p['12'] + +p['14']);
  }

  private getPi4(p: any, pi1: number) {
    return pi1 * +p['03'] / (+p['30'] + +p['32'] + +p['34']);
  }

  private getPi3(p: any, pi2: number, pi4: number) {
    return (pi2 * +p['12'] + pi4 * +p['32']) / +p['20'];
  }

  private getPi5(p: any, pi2: number, pi4: number) {
    return (pi2 * +p['14'] + pi4 * +p['34']) / +p['40'];
  }

  getFinalDispersion(p: any): number[] {
    const pi1 = this.getPi1(p);
    const pi2 = this.getPi2(p, pi1);
    const pi4 = this.getPi4(p, pi1);
    const pi3 = this.getPi3(p, pi2, pi4);
    const pi5 = this.getPi5(p, pi2, pi4);

    return [pi1, pi2, pi3, pi4, pi5];
  }

  getSumOfArr(arr: number[]): number {
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    return arr.reduce(reducer);
  }
}
