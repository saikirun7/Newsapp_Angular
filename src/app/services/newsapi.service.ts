import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsapiService {
  constructor(private http: HttpClient) {}

  url = 'https://newsapi.org/v2/top-headlines?';
  apiKey = '&apiKey=7b438fe17bd047b998f5cc24c5c3fd75';

  getheadlines(filters) {
    let query = `country=${filters.country}&category=${filters.category}`;
    return this.http.get(`${this.url}${query}${this.apiKey}`);
  }
}
