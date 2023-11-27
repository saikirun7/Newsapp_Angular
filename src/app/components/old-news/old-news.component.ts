import { FormControl, FormGroup } from '@angular/forms';
import { SearchApiService } from './../../services/search-api.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NewsArticle } from 'src/app/model/NewsArticle';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-old-news',
  templateUrl: './old-news.component.html',
  styleUrls: ['./old-news.component.css'],
})
export class OldNewsComponent implements OnInit {
  constructor(
    private searchService: SearchApiService,
    private _snackBar: MatSnackBar
  ) {}
  sources = [];
  filter: FormGroup;
  dates = ['Newest to Oldest', 'Oldest to Newest'];
  // All News articles from api call
  news: NewsArticle[] = [];
  // For Pagination
  pageSlice: NewsArticle[];

  ngOnInit(): void {
    this.getSources();
    this.filter = new FormGroup({
      keyword: new FormControl(),
      source: new FormControl('bbc-news'),
      range: new FormGroup({
        from: new FormControl(new Date()),
        to: new FormControl(),
      }),
      date: new FormControl('Newest to Oldest'),
    });
    this.searchByDateNSource();
    this.dateFilter();
  }

  dateFilter() {
    if (this.filter.value.date === 'Oldest to Newest') {
      this.news.sort(function (a, b): any {
        return Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
      });
      if (this.news.length < 5) {
        this.pageSlice = this.news.slice(0, this.news.length);
      } else {
        this.pageSlice = this.news.slice(0, 5);
      }
    }
    if (this.filter.value.date === 'Newest to Oldest') {
      this.news.sort(function (a, b): any {
        return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
      });
      if (this.news.length < 5) {
        this.pageSlice = this.news.slice(0, this.news.length);
      } else {
        this.pageSlice = this.news.slice(0, 5);
      }
    }
  }

  handlePage(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.news.length) {
      endIndex = this.news.length;
    }
    this.pageSlice = this.news.slice(startIndex, endIndex);
  }

  searchByDateNSource() {
    const args = {
      from: this.filter.value.range.from.toISOString().substring(0, 10),
      to: this.filter.value.range.to?.toISOString().substring(0, 10),
      keyword: this.filter.value.keyword,
      source: this.filter.value.source,
    };
    this.searchService.searchOldNews(args).subscribe(
      (res: any) => {
        this.news = res.articles;
        this.pageSlice = this.news.slice(0, 5);
      },
      (err) => {
        this._snackBar.open(err.error.message, 'Close', { duration: 5000 });
      }
    );
  }
  getSources() {
    this.searchService.sourcesList().subscribe((res: any) => {
      this.sources = res.sources.map((source) => ({
        id: source.id,
        name: source.name,
      }));
    });
  }
}
