import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router,
     private dataService: DataServiceService,
      private snackbar: MatSnackBar) 
      { }

  //two way binding variables 
  username=""; // stores username from input
  password=""; // stores password from input

  // function handles the login of the user a
  loginUser()
  {
    // checking if entered username and password is correct
 if(this.username==="ritik"&&this.password==="1234")
 {
  //setting user ad loggedin in service file
   this.dataService.setLogin("true");

// routing user to the home page
   this.router.navigate(['/home']);
  }
  else
  {
    // if the username or password is not correct 
    this.snackbar.open( "Wrong credentials!.", 'Try again', {
      duration: 3000
    });
  }
}
 

ngOnInit() {

  // checking if user is already logged in
  if(this.dataService.getLogin() === "true")
  {
    // if logged in then routing to dashboard
   this.router.navigate(['/home']);
  }
}

}
