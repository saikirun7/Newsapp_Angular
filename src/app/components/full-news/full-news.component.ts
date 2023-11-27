import { NewsInfoTransferService } from '../../services/news-info-transfer.service';
import { NewsArticle } from '../../model/NewsArticle';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './full-news.component.html',
  styleUrls: ['./full-news.component.css'],
})
export class FullNewsComponent implements OnInit {
  newsArticle: NewsArticle;
  constructor(
    private newsInfoTransferService: NewsInfoTransferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newsArticle = this.newsInfoTransferService.getNewsArticle();
    if (this.newsArticle === undefined) {
      this.router.navigate(['/dashboard']);
    }
  }
}
