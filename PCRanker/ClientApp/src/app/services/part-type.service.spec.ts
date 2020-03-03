import { TestBed } from '@angular/core/testing';

import { PartTypeService } from './part-type.service';

describe('PartTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartTypeService = TestBed.get(PartTypeService);
    expect(service).toBeTruthy();
  });
});
