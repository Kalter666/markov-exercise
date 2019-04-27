import { Injectable } from '@angular/core';
import { inv, multiply, transpose } from 'mathjs';

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

    this.transitionMatrix = matrix;
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
    const trM: any = transpose(matrix);
    for (let i = 0; i < trM.length; i++) {
      for (let j = 0; j < trM[i].length; j++) {
        if (i === j) {
          trM[i][j] = trM[i][j] - 1;
        }
        if (i === (trM.length - 1)) {
          trM[i][j] = 1;
        }
      }
    }
    const sumR = trM.map(() => 0);
    sumR[sumR.length - 1] = 1;
    return {
      matrix: trM,
      sum: sumR
    };
  }

  getInv() {
    const { matrix } = this.getSystem();
    return inv(matrix);
  }

  getStatDisp() {
    const matrix = this.getInv();
    const { sum } = this.getSystem();
    return multiply(matrix, sum);
  }

  checkStatDisp() {
    const transitionM: any = this.getTransitionMatrix();
    const statD = this.getStatDisp();
    const trIM = transpose(transitionM);
    return multiply(trIM, statD);
  }
}
