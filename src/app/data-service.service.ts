import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
 
  private book:any = undefined;
  private function="Add";

  setData(book:any){
      this.book = book;
  }

  getData():any{
      return this.book;
  }

  setFunction(change:string){
    this.function = change;
}

   getFunction():string{
    return this.function;
   }

   setLogin(status:string){
    localStorage.setItem("loggedin", status);
}

   getLogin():any{
    
    if(Boolean(localStorage.getItem("loggedin")))
    return localStorage.getItem("loggedin");
    else
    return "false";
   }

}
