import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BackenedService } from '../backened.service';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-adding-book',
  templateUrl: './adding-book.component.html',
  styleUrls: ['./adding-book.component.scss']
})
export class AddingBookComponent {

//component is for update and add a new book

  BookToBeDisplayed: any;

  FunctionToPerform: string = "Add";

  constructor(public api: BackenedService, 
    public router: Router,
     private dataService: DataServiceService,
      private snackbar: MatSnackBar) {}

   //initialisin the reactive form for taking the details
  addingBookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),  //input for title
    author: new FormControl('', [Validators.required]), //input for author
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])  //input for price
  })

  //function to add new book or update book to database
  Add_Book_To_Database() {

     //checking if fuction type is to Add the book
    if (this.FunctionToPerform === "Add") {

      //calling for api
      this.api.postBookToDb(
        this.addingBookForm.controls['title'].value,
        this.addingBookForm.controls['author'].value,
        this.addingBookForm.controls['price'].value).subscribe(
          (data: any) => {
            this.snackbar.open(data.message, 'Ok', {
              duration: 3000
            });
          });
    }

    //checking if fuction type is to Update the book
    else if (this.BookToBeDisplayed) {
      this.api.UpdateBookInDb(this.addingBookForm.controls['title'].value, 
      this.addingBookForm.controls['author'].value, this.addingBookForm.controls['price'].value, 
      this.BookToBeDisplayed.id).subscribe(
        (data: any) => {
        this.snackbar.open( data.message, 'Ok', {
          duration: 3000
        });
      },
      );
    }

    this.addingBookForm.controls['title'].setValue('');
    this.addingBookForm.controls['author'].setValue('');
    this.addingBookForm.controls['price'].setValue('');
  }
  get title() {
    return this.addingBookForm.get('title');
  }
  get author() {
    return this.addingBookForm.get('author');
  }
  get price() {
    return this.addingBookForm.get('price');
  }
 
  //function to return back to dashboard
  redirect_To_Home() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
     // function of check if user is logged in
     if(this.dataService.getLogin() === "false")
     {
      this.router.navigate(['/']);
     }
else{
     // getting details of the books recieved from the otehr component
    this.BookToBeDisplayed = this.dataService.getData();
    if (this.BookToBeDisplayed) {
      this.addingBookForm.controls['title'].setValue(this.BookToBeDisplayed.title);
      this.addingBookForm.controls['author'].setValue(this.BookToBeDisplayed.author);
      this.addingBookForm.controls['price'].setValue(this.BookToBeDisplayed.price);
      this.FunctionToPerform = this.dataService.getFunction();
    }
  }
  }
}
