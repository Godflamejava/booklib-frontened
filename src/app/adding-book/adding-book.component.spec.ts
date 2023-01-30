import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingBookComponent } from './adding-book.component';
import { BackenedService } from '../backened.service';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddingBookComponent', () => {
  let component: AddingBookComponent;
  let fixture: ComponentFixture<AddingBookComponent>;
  let backenedServiceStub: Partial<BackenedService>;
  let matSnackerStub:Partial<MatSnackBar>;
   
  beforeEach(async () => {
      let expect:any;
    backenedServiceStub = {
      getAllBooks: ()=>{
         return of(expect);
      },
      getAllBooksById:(value:Number)=>{
        return of(expect);
        }
    };



    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule],
       declarations: [ AddingBookComponent ],
       providers: [ { provide: BackenedService, useValue: backenedServiceStub },{provide: MatSnackBar, useValue: matSnackerStub } ],

    })
    .compileComponents();


    fixture = TestBed.createComponent(AddingBookComponent);
    component = fixture.componentInstance;
    backenedServiceStub = TestBed.inject(BackenedService);
    matSnackerStub=TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid title', () => {
    component.addingBookForm.setValue({
      "title": "", 
      "author": "invalidemail", 
      "price": '100'
    });

    expect(component.addingBookForm.valid).toEqual(false);
  });

  it('should require valid author', () => {
    component.addingBookForm.setValue({
      "title": "titile", 
      "author": "", 
      "price": '100'
    });

    expect(component.addingBookForm.valid).toEqual(false);
  });

  it('should require valid price', () => {
    component.addingBookForm.setValue({
      "title": "titile", 
      "author": "invalidemail", 
      "price": ''
    });

    expect(component.addingBookForm.valid).toEqual(false);
  });

  it('should require  price to be numeric', () => {
    component.addingBookForm.setValue({
      "title": "titile", 
      "author": "invalidemail", 
      "price": 'frrfrf'
    });
    expect(component.addingBookForm.valid).toEqual(false);
  });

  it('should allow user to add book', () => {
    component.api.postBookToDb = jasmine.createSpy().and.returnValue(of());
    const formData = {
      "title": "something@somewhere.com",
      "author": "8938ndisn@din",
      "price": "6262",
    };
    component.addingBookForm.setValue(formData);
       component.function="Add";
    component.Add_Book_To_Database();
    expect(component.api.postBookToDb).toHaveBeenCalledWith(formData.title, formData.author,formData.price);
  })

  it('should allow user to edit book', () => {
    component.api.UpdateBookInDb = jasmine.createSpy().and.returnValue(of());
    const formData = {
      "title": "something@somewhere.com",
      "author": "8938ndisn@din",
      "price": "6262",
     
    };
    component.addingBookForm.setValue(formData);
      component.book={
        "title": "something@somewhere.com",
      "author": "8938ndisn@din",
      "price": "6262",
      "id": 1
      }
       component.function="Edit";
    component.Add_Book_To_Database();
    expect(component.api.UpdateBookInDb).toHaveBeenCalledWith(formData.title, formData.author,formData.price,1);
  })

  it('should allow user to redirect home', () => {
    component.router.navigate=jasmine.createSpy();
    component.redirect_To_Home();
    expect(component.router.navigate).toHaveBeenCalled();
  })
});
