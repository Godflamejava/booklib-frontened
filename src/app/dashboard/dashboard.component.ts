import { Component } from '@angular/core';
import { BackenedService } from '../backened.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  constructor(private api: BackenedService, public router: Router, public dialog: MatDialog, private dataService: DataServiceService) {
  }
  BookDetailToSearch = "";// detail of the book entered in the search box

  BookDataToShow: any; //list of the book from the database

  // function to get book on based of entered id
  getBookByIndex() {
    if (this.isInDesiredForm(this.BookDetailToSearch)) {
      this.api.getAllBooksById(Number(this.BookDetailToSearch)).subscribe((data: any) => {
        this.BookDataToShow = data;
      });
    }
    else {
      this.api.getAllBooks().subscribe((data: any) => {
        this.BookDataToShow = data;
      });
    }
  }

  isInDesiredForm(str: String) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  ngOnInit() {
    // checking if loggedin 
    if (this.dataService.getLogin() === "false") {
      this.router.navigate(['/']);
    }
    else {
      // getting all the books

      this.api.getAllBooks().subscribe((data: any) => {
        this.BookDataToShow = data;
      });
    }
  }

  // function to logout
  logout() {
    this.dataService.setLogin("false");
    this.router.navigate(['/']);
  }

  //function to delete book from db
  delete_From_Db(id: any) {
    console.log(id);
    this.api.DeleteBookFromDb(id).subscribe((data: any) => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home']);
      });
    });
  }

  // function to open dialog to confirm delete 
  openDialog(id: any) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'false') {
        console.log(result);
        this.delete_From_Db(id);
      }

    })
  }
    // function to redirect to add
  redirect_To_Add(book: any) {
    this.dataService.setData(book);
    this.dataService.setFunction("Update");
    console.log(book);
    this.router.navigate(['/add']);
  }

}
