import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { NewsArticle } from '../model/NewsArticle';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesApiService {

  baseUrl : string = "http://localhost:9090/api/";

  constructor(private http: HttpClient, private authService: AuthenticationService) {
   }
   
   getBookmarks(): Observable<any>{

    let finalUrl = `${this.baseUrl}bookmarks`; 
    console.log(finalUrl);
    console.log(`Bearer ${this.authService.getToken()}`);
    
    
    return this.http.get<any>(finalUrl,{ headers: this.getHeader() });   
   }

   addBookmark(newsArticle: NewsArticle) : Observable<any>{

      let finalUrl = `${this.baseUrl}bookmarks`;
      console.log(finalUrl);

      return this.http.post(finalUrl,newsArticle,{headers: this.getHeader()});
   }
  
   deleteBookmark(news: any) : Observable<any>{
    let finalUrl = `${this.baseUrl}bookmarks/${news.id}`;
    console.log(finalUrl);

     return this.http.delete(finalUrl,{headers: this.getHeader() });
  
   }
   getHeader():HttpHeaders{
     var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
   });

   return reqHeader
   }


}
