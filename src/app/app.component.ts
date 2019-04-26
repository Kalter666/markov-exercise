import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DispersionService } from './dispersion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  calculateGroup = new FormGroup({
    r: new FormControl(0, [Validators.required]),
    q: new FormControl(0, [Validators.required])
  });

  constructor(dispersionService: DispersionService) {
  }

  ngOnInit(): void {
    this.calculateGroup.valueChanges.subscribe(value => console.log(value));
  }
}
