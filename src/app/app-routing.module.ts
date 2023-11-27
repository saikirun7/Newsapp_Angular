import { OldNewsComponent } from './components/old-news/old-news.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FullNewsComponent } from './components/full-news/full-news.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { LoginGuardGuard } from './login-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuardGuard],
        component: DashboardComponent,
      },
      {
        path: 'news',
        canActivate: [AuthGuardGuard],
        component: FullNewsComponent,
      },
    ],
  },
  {
    path: 'old-news',
    canActivate: [AuthGuardGuard],
    component: OldNewsComponent,
  },
  {
    path: 'bookmarks',
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuardGuard],
        component: FavouritesComponent,
      },
      {
        path: 'news',
        canActivate: [AuthGuardGuard],
        component: FullNewsComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
