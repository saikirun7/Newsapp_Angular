import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsArticleComponent } from './components/news-article/news-article.component';
import { FullNewsComponent } from './components/full-news/full-news.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

import { NewsapiService } from './services/newsapi.service';
import { NewsInfoTransferService } from './services/news-info-transfer.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

import * as moment from 'moment';
import { OldNewsComponent } from './components/old-news/old-news.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    NewsArticleComponent,
    FullNewsComponent,
    NotFoundComponent,
    SearchBarComponent,
    FavouritesComponent,
    OldNewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
  ],
  providers: [
    NewsapiService,
    NewsInfoTransferService,
    { provide: 'moment', useValue: moment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
