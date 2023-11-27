import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//Api key 1 = 0e5f45fa4f784965a6ac7b47e0f2a184

//Api key 2 = 7b438fe17bd047b998f5cc24c5c3fd75
export class SearchApiService {
  baseUrl: string = 'https://newsapi.org/v2/everything?';
  constructor(private http: HttpClient) {}

  searchNews(searchString: string): Observable<any> {
    let finalUrl = `${this.baseUrl}q=${searchString}&apiKey=0e5f45fa4f784965a6ac7b47e0f2a184`;
    return this.http.get<any>(finalUrl);
  }

  searchOldNews({ from, to, keyword, source }): Observable<any> {
    let finalUrl = `${this.baseUrl}`;
    if (from) {
      finalUrl = finalUrl + `from=${from}&`;
    }
    if (to) {
      finalUrl = finalUrl + `to=${to}&`;
    }
    if (keyword) {
      finalUrl = finalUrl + `q=${keyword}&`;
    }
    if (source) {
      finalUrl = finalUrl + `sources=${source}&`;
    }
    finalUrl = finalUrl + `apiKey=7b438fe17bd047b998f5cc24c5c3fd75`;
    return this.http.get(finalUrl);
  }

  sourcesList() {
    return this.http.get(
      'https://newsapi.org/v2/sources?apiKey=7b438fe17bd047b998f5cc24c5c3fd75'
    );
  }
}
