/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServingsService } from './servings.service';

describe('Service: Servings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServingsService]
    });
  });

  it('should ...', inject([ServingsService], (service: ServingsService) => {
    expect(service).toBeTruthy();
  }));
});
