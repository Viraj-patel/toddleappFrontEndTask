import { TestBed } from '@angular/core/testing';

import { SavefileService } from './savefile.service';

describe('SavefileService', () => {
  let service: SavefileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavefileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
