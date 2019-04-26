import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { DispersionService } from './dispersion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  calculateGroup: FormGroup;

  transitionMatrix: number[][];
  rowsSum: number[];
  ir: number;
  iq: number;

  constructor(private dispersionService: DispersionService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.calculateGroup = this.formBuilder.group({
      r: new FormControl(0, [Validators.required]),
      q: new FormControl(0, [Validators.required])
    });
    this.calculateGroup.valueChanges.subscribe(({ r, q }) => this.changeValues(r, q));
  }

  changeValues(r: number, q: number) {
    this.dispersionService.r = r;
    this.dispersionService.q = q;
    this.transitionMatrix = this.dispersionService.getTransitionMatrix();
    this.rowsSum = this.dispersionService.checkTransitionMatrix();
    const { ir, iq } = this.dispersionService.getInverse();
    this.ir = ir;
    this.iq = iq;
  }
}
