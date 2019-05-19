import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatrixBase } from '../exercise1/matrix-base';
import { MatrixControlService } from '../exercise1/matrix-control.service';
import { MatrixService } from '../exercise1/matrix.service';

const INITIAL_MATRIX = [
  [0.7, 0.1, 0.1, 0.1, 0],
  [0, 0.3, 0.6, 0, 0.1],
  [0.8, 0, 0.2, 0, 0],
  [0.6, 0, 0.2, 0.1, 0.1],
  [0.1, 0, 0, 0, 0.9],
];

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.scss'],
  providers: [MatrixControlService, MatrixService]
})
export class Exercise2Component implements OnInit {
  matrixVals: MatrixBase<any>[][] = [];
  transitionMatrixForm: FormGroup;

  matrix: number[][] = INITIAL_MATRIX;
  sumOfRows: number[] = [];

  finalDispersion: number[] = [];
  sumOfDispersion: number;

  constructor(private mcs: MatrixControlService, private ms: MatrixService) {
    this.sumOfRows = this.ms.getSumOfRows(this.matrix);
  }

  ngOnInit() {
    this.matrixVals = this.ms.getVals(this.matrix);
    this.transitionMatrixForm = this.mcs.toFormGroup(this.matrixVals);
    this.finalDispersion = this.ms.getFinalDispersion(this.transitionMatrixForm.value);
    this.sumOfDispersion = this.ms.getSumOfArr(this.finalDispersion);

    this.transitionMatrixForm.valueChanges.subscribe(vals => {
      this.onChangeTransitionMatrix(vals);
    });
  }

  onChangeTransitionMatrix(vals) {
    this.matrix = this.ms.toMatrix(vals);
    this.sumOfRows = this.ms.getSumOfRows(this.matrix);
    this.finalDispersion = this.ms.getFinalDispersion(vals);
    this.sumOfDispersion = this.ms.getSumOfArr(this.finalDispersion);
  }

}
