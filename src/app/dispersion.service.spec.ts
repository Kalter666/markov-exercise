import { TestBed } from '@angular/core/testing';

import { DispersionService } from './dispersion.service';

describe('DispersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispersionService = TestBed.get(DispersionService);
    expect(service).toBeTruthy();
  });
});
