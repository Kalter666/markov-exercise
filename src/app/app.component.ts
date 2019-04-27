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

  system: number[][];
  sumSys: number[];

  invM: any;

  multiM: any;

  statD: any;

  constructor(private dispersionService: DispersionService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.calculateGroup = this.formBuilder.group({
      r: new FormControl(0.2, [Validators.required, Validators.min(0), Validators.max(1)]),
      q: new FormControl(0.3, [Validators.required, Validators.min(0), Validators.max(1)])
    });
    this.changeValues(this.calculateGroup.value.r, this.calculateGroup.value.q);
    this.calculateGroup.valueChanges.subscribe(({ r, q }) => this.changeValues(r, q));
  }

  changeValues(r: number, q: number) {
    this.dispersionService.r = r;
    this.dispersionService.q = q;
    this.transitionMatrix = this.dispersionService.getTransitionMatrix();
    this.rowsSum = this.dispersionService.checkTransitionMatrix(this.transitionMatrix);

    const { matrix, sum } = this.dispersionService.getSystem();
    this.system = matrix;
    this.sumSys = sum;

    this.invM = this.dispersionService.getInv();

    this.multiM = this.dispersionService.getStatDisp();

    this.statD = this.dispersionService.checkStatDisp();

    const { ir, iq } = this.dispersionService.getInverse();
    this.ir = +ir.toFixed(4);
    this.iq = +iq.toFixed(4);
  }

  get r() {
    return this.calculateGroup.get('r');
  }

  get q() {
    return this.calculateGroup.get('q');
  }
}
