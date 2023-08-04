import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ClientGenreComponent } from './client/client-genre/client-genre.component';
import { ClientCartComponent } from './client/client-cart/client-cart.component';
import { ClientCheckoutComponent } from './client/client-checkout/client-checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientSuccessComponent } from './client-success/client-success.component';
import { AdminComponent } from './admin/admin.component';
import { ReceiptComponent } from './admin/receipt/receipt.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { GenreComponent } from './admin/genre/genre.component';
import { BooksComponent } from './admin/books/books.component';

const routes: Routes = [
  { path: 'client-home', component: ClientHomeComponent},
  { path: 'client-genre/:id', component: ClientGenreComponent},
  { path: 'client-cart', component: ClientCartComponent},
  { path: 'client-checkout', component: ClientCheckoutComponent},
  { path: 'client-success', component: ClientSuccessComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'receipt',
        component: ReceiptComponent
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'genre',
        component: GenreComponent
      },
      {
        path: 'books',
        component: BooksComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-success', component: SignupSuccessComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
