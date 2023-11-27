import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NewsapiService } from '../../services/newsapi.service';
import { NewsArticle } from '../../model/NewsArticle';
import { FavouritesApiService } from 'src/app/services/favourites-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  countries = [
    { key: 'us', value: 'United States' },
    { key: 'in', value: 'India' },
  
    { key: 'at', value: 'Austria' },
    { key: 'ca', value: 'Canada' },
    { key: 'eg', value: 'Egypt' },
    { key: 'fr', value: 'France' },
    { key: 'hk', value: 'Hong Kong' },
    { key: 'ru', value: 'Russia' },
    { key: 'sg', value: 'Singapore' },
    { key: 'ae', value: 'UAE' },
  ];

  categories = [
    { key: 'business', value: 'Business' },
    { key: 'entertainment', value: 'Entertainment' },
    { key: 'health', value: 'Health' },
    { key: 'science', value: 'Science' },
    { key: 'general', value: 'General' },
    { key: 'sports', value: 'Sports' },
    { key: 'technology', value: 'Technology' },
  ];

  dates = ['Newest to Oldest', 'Oldest to Newest'];

  // All News articles from api call
  news: NewsArticle[] = [];
  // For Pagination
  pageSlice: NewsArticle[];
  // Form
  filter: FormGroup;
  // list of sources
  sources: any[];

  sourceFilteredArticles: any[];

  constructor(
    private newsAPI: NewsapiService,
    private favouriteService: FavouritesApiService
  ) {}

  ngOnInit() {
    this.filter = new FormGroup({
      source: new FormControl(''),
      category: new FormControl('general'),
      country: new FormControl('us', [Validators.required]),
      date: new FormControl('Newest to Oldest'),
    });
    this.loadNews(this.filter.value);
  }

  handlePage(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.news.length) {
      endIndex = this.news.length;
    }
    this.pageSlice = this.news.slice(startIndex, endIndex);
  }

  filterArticles() {
    this.loadNews(this.filter.value);
    this.filter.setValue({
      ...this.filter.value,
      source: '',
      date: 'Newest to Oldest',
    });
  }

  loadNews(filters) {
    this.newsAPI.getheadlines(filters).subscribe((res: any) => {
      this.news = res.articles;
      this.sourceFilteredArticles = this.news;
      this.pageSlice = this.sourceFilteredArticles.slice(0, 5);
      this.sources = res.articles.map((article) => article.source);
      const uniqueValuesSet = new Set();
      this.sources = this.sources.filter((element) => {
        const isPresentInSet = uniqueValuesSet.has(element.name);
        uniqueValuesSet.add(element.name);
        return !isPresentInSet;
      });
    });
  }

  sourceFilter() {
    let currentSource = this.filter.value.source;
    this.sourceFilteredArticles = this.news.filter(
      (eachNews) => eachNews.source.name === currentSource
    );
    if (this.sourceFilteredArticles.length < 5) {
      this.pageSlice = this.sourceFilteredArticles.slice(0, this.news.length);
    } else {
      this.pageSlice = this.sourceFilteredArticles.slice(0, 5);
    }
  }

  search(articles) {
    this.news = articles;
    this.sourceFilteredArticles = this.news;
    this.dateFilter();
    this.pageSlice = this.sourceFilteredArticles.slice(0, 5);
    this.sources = articles.map((article) => article.source);
    const uniqueValuesSet = new Set();
    this.sources = this.sources.filter((element) => {
      const isPresentInSet = uniqueValuesSet.has(element.name);
      uniqueValuesSet.add(element.name);
      return !isPresentInSet;
    });
    this.filter.setValue({
      ...this.filter.value,
      category: '',
      country: '',
    });
    this.filter.controls.country.disable();
    this.filter.controls.category.disable();
  }

  dateFilter() {
    if (this.filter.value.date === 'Oldest to Newest') {
      this.news.sort(function (a, b): any {
        return Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
      });
      this.sourceFilteredArticles.sort(function (a, b): any {
        return Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
      });
      if (this.sourceFilteredArticles.length < 5) {
        this.pageSlice = this.sourceFilteredArticles.slice(0, this.news.length);
      } else {
        this.pageSlice = this.sourceFilteredArticles.slice(0, 5);
      }
    }
    if (this.filter.value.date === 'Newest to Oldest') {
      this.news.sort(function (a, b): any {
        return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
      });
      this.sourceFilteredArticles.sort(function (a, b): any {
        return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
      });
      if (this.sourceFilteredArticles.length < 5) {
        this.pageSlice = this.sourceFilteredArticles.slice(0, this.news.length);
      } else {
        this.pageSlice = this.sourceFilteredArticles.slice(0, 5);
      }
    }
  }
}
