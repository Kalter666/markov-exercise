import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DispersionService {
  r: number;
  q: number;
  private transitionMatrix: number[][];

  constructor() {
  }

  getInverse() {
    return {
      ir: 1 - this.r,
      iq: 1 - this.q
    };
  }

  getTransitionMatrix(): number[][] {
    if (this.r < 0 || this.r > 1 || this.q < 0 || this.q > 1) {
      throw new Error('q и r должны быть не больше 1 и не меньше 0');
    }
    const { ir, iq } = this.getInverse();

    const sqrIr = Math.pow(ir, 2);
    const trplIr = Math.pow(ir, 3);
    const sqrR = Math.pow(this.r, 2);
    const trplR = Math.pow(this.r, 3);
    const sqrQ = Math.pow(this.q, 2);
    const trplQ = Math.pow(this.q, 3);
    const sqrIq = Math.pow(iq, 2);
    const trplIq = Math.pow(iq, 3);

    const matrix = [
      [trplIr, 3 * sqrIr * this.r, 3 * ir * sqrR, trplR],
      [sqrIr * this.q, sqrIr * iq + 2 * ir * this.q * this.r, 2 * ir * this.r * iq + this.q * sqrR, iq * sqrR],
      [sqrQ * ir, sqrQ * this.r + 2 * iq * ir * this.q, sqrIq * ir + 2 * this.r * iq * this.q, sqrIq * this.r],
      [trplQ, 3 * iq * sqrQ, 3 * this.q * sqrIq, trplIq]
    ];

    this.transitionMatrix = matrix.map(row => row.map(val => +val.toFixed(3)));
    return this.transitionMatrix;
  }

  checkTransitionMatrix(matrix: number[][]): number[] {
    const sum: number[] = [];
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    matrix.forEach(row => {
      sum.push(+row.reduce(reducer).toFixed(1));
    });
    return sum;
  }

  getSystem(): any {
    const matrix = this.transitionMatrix;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (i === j) {
          matrix[i][j] = matrix[i][j] - 1;
        }
      }
    }
    const check = this.checkTransitionMatrix(matrix)
    return { matrix, check };
  }
}
