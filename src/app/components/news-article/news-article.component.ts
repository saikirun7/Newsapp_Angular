import { NewsArticle } from '../../model/NewsArticle';
import {
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { NewsInfoTransferService } from '../../services/news-info-transfer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavouritesApiService } from 'src/app/services/favourites-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css'],
})
export class NewsArticleComponent implements OnInit {
  @Input('news') news: NewsArticle;

  //To send delete bookmark to parent component
  // @Output() deleteEventChild = new EventEmitter();

  constructor(
    private newaInfoTransferService: NewsInfoTransferService,
    public router: Router,
    private favouriteService: FavouritesApiService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    @Inject('moment') public moment
  ) {}

  bookmark: boolean = false;

  ngOnInit(): void {}

  moveToFullArticle(data: NewsArticle) {
    this.newaInfoTransferService.setNewsArticle(data);
    this.router.navigate([{}, 'news'], { relativeTo: this.route });
  }

  addToBookmark(news: NewsArticle) {
    this.bookmark = true;
    this.favouriteService.addBookmark(news).subscribe(
      //News Added to bookmark
      (res) => {
        console.log(res);
        this._snackBar.open('News Added to Bookmark', 'Close', {
          duration: 5000,
        });
      },
      // Error in adding bookmark
      (err) => {
        this.bookmark = false;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${err.status}, body was: ${err.error}`
          );
          console.log(err.error.message);

          if (err.status === 400) {
            this.bookmark = true;
            console.log('Inside 400');
            console.log(err.error);
            this._snackBar.open('Already Added to Bookmark', 'Close', {
              duration: 1000,
            });
          }
        }
      }
    );
  }

  // Delete bookmark method uses emit to send data to parent
  deleteFromBookmark(news: any) {
    console.log('Delete');
    this.favouriteService.deleteBookmark(news).subscribe(
      (res: any) => {
        console.log(res);
        window.location.reload();
        // this.deleteEventChild.emit('Delete');
      },
      (err) => {
        // alert('err');
        // window.location.reload();
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${err.status}, body was: ${err.error}`
          );
        }
      }
    );
  }
}
