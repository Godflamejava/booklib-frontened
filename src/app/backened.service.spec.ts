import { TestBed } from '@angular/core/testing';

import { BackenedService } from './backened.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BackenedService', () => {
  let service: BackenedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(BackenedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
