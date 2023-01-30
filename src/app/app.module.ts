import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackenedService } from './backened.service';
import { FormsModule } from '@angular/forms';
import { AddingBookComponent } from './adding-book/adding-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReactiveFormsModule}from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DataServiceService } from './data-service.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';





@NgModule({
  declarations: [
    AppComponent,
    AddingBookComponent,
    DashboardComponent,
    DialogDeleteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [BackenedService,DataServiceService],
  bootstrap: [AppComponent],
  entryComponents: [DialogDeleteComponent],
})
export class AppModule { }
