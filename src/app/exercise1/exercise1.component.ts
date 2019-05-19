import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatrixBase } from './matrix-base';
import { MatrixControlService } from './matrix-control.service';
import { INITIAL_MATRIX, MatrixService } from './matrix.service';

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

  constructor(
    private matrixControlService: MatrixControlService,
    private matrixService: MatrixService
  ) {
    this.changeSum();
  }

  ngOnInit() {
    this.matrixVals = this.matrixService.getVals();
    this.transitionMatrixForm = this.matrixControlService.toFormGroup(this.matrixVals);
    this.transitionMatrixForm.valueChanges.subscribe(vals => {
      this.matrix = this.matrixService.toMatrix(vals);
      this.changeSum();
    });
  }

  changeSum() {
    this.sumOfRows = this.matrixService.getSumOfRows(this.matrix);
  }

}
