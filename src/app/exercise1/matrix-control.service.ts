import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatrixBase } from './matrix-base';

@Injectable()
export class MatrixControlService {
  constructor() { }

  toFormGroup(questions: MatrixBase<any>[][]) {
    const group: any = {};

    const iterator = question => group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
      : new FormControl(question.value || '');

    questions.forEach(row => {
      row.forEach(iterator);
    });
    return new FormGroup(group);
  }
}
