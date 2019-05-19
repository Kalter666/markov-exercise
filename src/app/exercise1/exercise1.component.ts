import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatrixBase } from './matrix-base';
import { MatrixControlService } from './matrix-control.service';
import { MatrixService } from './matrix.service';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.scss'],
  providers: [MatrixControlService, MatrixService]
})
export class Exercise1Component implements OnInit {
  matrixVals: MatrixBase<any>[][] = [];
  transitionMatrixForm: FormGroup;

  constructor(
    private matrixControlService: MatrixControlService,
    private matrixService: MatrixService
  ) {
  }

  ngOnInit() {
    this.matrixVals = this.matrixService.getVals();
    this.transitionMatrixForm = this.matrixControlService.toFormGroup(this.matrixVals);
    this.transitionMatrixForm.valueChanges.subscribe(console.log);
  }

}
