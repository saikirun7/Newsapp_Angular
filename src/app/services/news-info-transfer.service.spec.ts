import { TestBed } from '@angular/core/testing';

import { NewsInfoTransferService } from './news-info-transfer.service';

describe('NewsInfoTransferService', () => {
  let service: NewsInfoTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsInfoTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
