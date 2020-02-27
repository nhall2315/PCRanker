import { TestBed } from '@angular/core/testing';

import { DataRetrieveService } from './data-retrieve.service';

describe('DataRetrieveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataRetrieveService = TestBed.get(DataRetrieveService);
    expect(service).toBeTruthy();
  });
});
