import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackenedService {

  constructor(private http:HttpClient) { }
  
getAllBooks(): Observable<any>{
  return this.http.get('http://localhost:7000/'); 
  }

  getAllBooksById(value:Number): Observable<any>{
    return this.http.get(`http://localhost:7000/${value}`); 
    }
  
    postBookToDb(title:any,author:any,price:any){
      const url = 'http://localhost:7000/';
      return this.http.post<any>(url,{
        title,author,price} ); 
    }
    DeleteBookFromDb(id:any){
      return this.http.delete(`http://localhost:7000/${id}`); 
    }
    UpdateBookInDb(title:any,author:any,price:any,id:any){
      return this.http.put<any>(`http://localhost:7000/${id}`, {title,author,price});
    }
}
