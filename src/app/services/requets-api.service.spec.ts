import { TestBed } from '@angular/core/testing';

import { RequetsApiService } from './requets-api.service';

describe('RequetsApiService', () => {
  let service: RequetsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequetsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
