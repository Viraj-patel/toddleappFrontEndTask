import { TestBed } from '@angular/core/testing';

import { ManageStandardService } from './manage-standard.service';

describe('ManageStandardService', () => {
  let service: ManageStandardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageStandardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
