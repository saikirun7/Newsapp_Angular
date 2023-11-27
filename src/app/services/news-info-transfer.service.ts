import { NewsArticle } from '../model/NewsArticle';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsInfoTransferService {
  private newsArticle: NewsArticle = undefined;
  constructor() {}

  getNewsArticle(): NewsArticle {
    return this.newsArticle;
  }

  setNewsArticle(newsArticle: NewsArticle) {
    this.newsArticle = newsArticle;
  }
}
