import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { SearchApiService } from './search-api.service';

describe('SearchApiService', () => {
  let service: SearchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientModule,
    ],});
    service = TestBed.inject(SearchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
