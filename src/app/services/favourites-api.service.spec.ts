import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FavouritesApiService } from './favourites-api.service';

describe('FavouritesApiService', () => {
  let service: FavouritesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientModule,
    ],});
    service = TestBed.inject(FavouritesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
