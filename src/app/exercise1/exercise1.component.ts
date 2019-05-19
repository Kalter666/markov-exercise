import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathType } from 'mathjs';

import { MatrixBase } from './matrix-base';
import { MatrixControlService } from './matrix-control.service';
import { INITIAL_MATRIX, INITIAL_STATE_DISPERSION, MatrixService } from './matrix.service';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.scss'],
  providers: [MatrixControlService, MatrixService]
})
export class Exercise1Component implements OnInit {
  matrixVals: MatrixBase<any>[][] = [];
  transitionMatrixForm: FormGroup;

  matrix: number[][] = INITIAL_MATRIX;
  sumOfRows: number[] = [];
  initialStateDispersion: number[] = INITIAL_STATE_DISPERSION;
  initialStateDispersionForm: FormGroup;
  sumOfInitialState = 1;

  nthStateMatrix: MathType;
  state = 2;
  stateGroup: FormGroup;

  stateDispersions = [];

  constructor(
    private matrixControlService: MatrixControlService,
    private matrixService: MatrixService
  ) {
    this.sumOfRows = this.matrixService.getSumOfRows(this.matrix);
    this.nthStateMatrix = this.matrixService.matrixPow(this.matrix, this.state);
    this.stateDispersions = this.matrixService.getDispersion(this.matrix, this.state, this.initialStateDispersion);
  }

  ngOnInit() {
    this.matrixVals = this.matrixService.getVals();
    this.transitionMatrixForm = this.matrixControlService.toFormGroup(this.matrixVals);

    this.initialStateDispersionForm = new FormGroup({
      first: new FormControl(+this.initialStateDispersion[0]),
      second: new FormControl(+this.initialStateDispersion[1]),
      third: new FormControl(+this.initialStateDispersion[2]),
      fourth: new FormControl(+this.initialStateDispersion[3]),
      fifth: new FormControl(+this.initialStateDispersion[4]),
    });

    this.stateGroup = new FormGroup({
      n: new FormControl(this.state)
    });

    this.stateGroup.valueChanges.subscribe(vals => this.onChangeState(vals));

    this.initialStateDispersionForm.valueChanges.subscribe(vals => this.onChangeInitState(vals));

    this.transitionMatrixForm.valueChanges.subscribe(vals => {
      this.onChangeTransitionMatrix(vals);
    });
  }

  onChangeTransitionMatrix(vals) {
    this.matrix = this.matrixService.toMatrix(vals);
    this.sumOfRows = this.matrixService.getSumOfRows(this.matrix);
    this.nthStateMatrix = this.matrixService.matrixPow(this.matrix, this.state);
    this.stateDispersions = this.matrixService.getDispersion(this.matrix, this.state, this.initialStateDispersion);
  }

  onChangeState({ n }) {
    this.state = n;
    this.nthStateMatrix = this.matrixService.matrixPow(this.matrix, n);
    this.stateDispersions = this.matrixService.getDispersion(this.matrix, this.state, this.initialStateDispersion);
  }

  onChangeInitState(vals) {
    let sum = 0;
    for (const val of Object.keys(vals)) {
      sum += vals[val];
    }
    this.sumOfInitialState = +sum.toFixed(3);
  }

}
