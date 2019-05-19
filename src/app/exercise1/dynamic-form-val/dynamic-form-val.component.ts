import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatrixBase } from '../matrix-base';

@Component({
  selector: 'app-dynamic-form-val',
  templateUrl: './dynamic-form-val.component.html',
  styleUrls: ['./dynamic-form-val.component.scss']
})
export class DynamicFormValComponent {
  @Input() question: MatrixBase<any>;
  @Input() form: FormGroup;
}
