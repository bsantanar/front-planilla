import { TestBed } from '@angular/core/testing';

import { ApproachService } from './approach.service';

describe('ApproachService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApproachService = TestBed.get(ApproachService);
    expect(service).toBeTruthy();
  });
});
