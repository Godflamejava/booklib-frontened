import { ComponentFixture, flush, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { BackenedService } from '../backened.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dialogRef:any;

  const expected={
    "titile":"ritik",
    "author":"rawat",
    "price": 100
    } 
  let backenedServiceStub:Partial<BackenedService>={
 
    getAllBooks():Observable<any>{
      return of([expected]);
    },
    DeleteBookFromDb(id:any):Observable<any>{
      return of([expected]);
    }
  };
  let matDialogStub:MatDialog;
  let routerSpy:any;

  beforeEach(async () => {
    matDialogStub= jasmine.createSpyObj('matDialogStub',['open']);
    matDialogStub.open = jasmine.createSpy().and.returnValue(jasmine.createSpyObj('dialogref',['afterClosed']));
    dialogRef=matDialogStub.open(DialogDeleteComponent);
    dialogRef.afterClosed=jasmine.createSpy().and.returnValue(jasmine.createSpyObj('subscribed',['subscribe']));
    backenedServiceStub.DeleteBookFromDb=jasmine.createSpy().and.returnValue(of([expected]));
    routerSpy= {navigate: jasmine.createSpy('navigate')};

    await TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [ DashboardComponent ],
      providers: [ {provide:DialogDeleteComponent},{ provide: BackenedService, useValue: backenedServiceStub } ,{ provide: MatDialog, useValue:matDialogStub  } ,{provide: Router, useValue: routerSpy}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    backenedServiceStub = TestBed.inject(BackenedService);
    matDialogStub=TestBed.inject(MatDialog);
    routerSpy=TestBed.inject(Router);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on clicking search button with empty input search all books should be called', () => {
    const hostElement = fixture.nativeElement;
    const searchInput = hostElement.querySelector('#search')!;
    let searchbutton = hostElement.querySelector('#searchbutton')!;
    searchbutton.click();
   
      expect(component.BookData[0]).toEqual(expected); 
   
  });


  it('on clicking logout button persion should logout', fakeAsync(() => {
    const hostElement = fixture.nativeElement;
    const logoutbutton = hostElement.querySelector('#logout')!;
    logoutbutton.click();
    tick();
      expect(localStorage.getItem("loggedin")).toBe("false")
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('on clicking edit button should redirect to edit page', fakeAsync(() => {
    const hostElement = fixture.nativeElement;
    component.redirect_To_Add({});
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/add']);
  }));

  it('on clicking delete button should redirect to delete daialog', fakeAsync(() => {
    component.dialog=matDialogStub;
    component.openDialog(8);
    expect(component.dialog.open(DashboardComponent)).toHaveBeenCalled;
    expect(component.dialog.open(DashboardComponent).afterClosed).toHaveBeenCalled;
  }));

  it('on calling delete from db service function should be called', () => {
    component.dialog=matDialogStub;
    component.router.navigateByUrl=jasmine.createSpy().and.returnValue( new Promise((resolve, reject) => {
      resolve('Success!');
    }));
    component.delete_From_Db(8);
    expect(backenedServiceStub.DeleteBookFromDb).toHaveBeenCalled();
  });


});
