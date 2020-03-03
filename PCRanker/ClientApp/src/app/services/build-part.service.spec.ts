import { TestBed } from '@angular/core/testing';

import { BuildPartService } from './build-part.service';

describe('BuildPartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildPartService = TestBed.get(BuildPartService);
    expect(service).toBeTruthy();
  });
});
