import { Component, OnInit } from '@angular/core';
import { FavouritesApiService } from 'src/app/services/favourites-api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favouriteNews = [];

  paginationNews = [];

  constructor(private favouriteService: FavouritesApiService) {}

  ngOnInit(): void {
    this.getAllFavouriteNews();
    // this.getTryDemo();
  }

  handlePage(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.favouriteNews.length) {
      endIndex = this.favouriteNews.length;
    }
    this.paginationNews = this.favouriteNews.slice(startIndex, endIndex);
  }

  getAllFavouriteNews() {
    this.favouriteService.getBookmarks().subscribe(
      //Will get bookmark news here
      (res: any) => {
        console.log(res);
        this.favouriteNews = res.bookmark.reverse();
        this.paginationNews = this.favouriteNews.slice(0, 5);
        console.log('Here');
      },
      //Handling error
      (err) => {
        console.log(err);
      }
    );
  }

  deleteEventparent() {
    location.reload();
    // this.getAllFavouriteNews();
  }
}
