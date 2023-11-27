import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { NewsapiService } from './newsapi.service';

describe('NewsapiService', () => {
  let service: NewsapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
    });
    service = TestBed.inject(NewsapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
