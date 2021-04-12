/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DietaryrequirementsService } from './dietaryrequirements.service';

describe('Service: Dietaryrequirements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DietaryrequirementsService]
    });
  });

  it('should ...', inject([DietaryrequirementsService], (service: DietaryrequirementsService) => {
    expect(service).toBeTruthy();
  }));
});
