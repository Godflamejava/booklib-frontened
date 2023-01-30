import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddingBookComponent } from './adding-book/adding-book.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'add', component: AddingBookComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
