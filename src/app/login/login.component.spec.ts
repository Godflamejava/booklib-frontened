import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {MatTestDialogOpenerModule } from '@angular/material/dialog/testing';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let matSnackerStub:Partial<MatSnackBar>;
  let dataServiceStub:DataServiceService;
  let routerSpy:any;
  beforeEach(async () => {
     dataServiceStub=new DataServiceService();
     dataServiceStub.setLogin("false");
     routerSpy= {navigate: jasmine.createSpy('navigate')};
    await TestBed.configureTestingModule({
      imports:[MatTestDialogOpenerModule,FormsModule],
      declarations: [ LoginComponent ],
      providers: [{ provide: MatSnackBar, useValue: matSnackerStub },{provide: DataServiceService, useValue: dataServiceStub}, { provide: Router, useValue: routerSpy } ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    matSnackerStub=TestBed.inject(MatSnackBar);
    dataServiceStub=TestBed.inject(DataServiceService);
    fixture.detectChanges();
  });
  
 afterAll(() => {
  TestBed.resetTestingModule();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should bind input username and password value to Component property', () => {
    const hostElement = fixture.nativeElement;
    const usernamaeInput = hostElement.querySelector('#username')!;
    const passwordInput = hostElement.querySelector('#password')!;
    
    usernamaeInput.value='ritik'
    passwordInput.value='1234'
    usernamaeInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.username).toBe('ritik');
    expect(component.password.toString()).toBe('1234');
  });

  it('on entering correct credential user should be loggedin', () => {
    const hostElement = fixture.nativeElement;
    const usernamaeInput = hostElement.querySelector('#username')!;
    const passwordInput = hostElement.querySelector('#password')!;
    
    usernamaeInput.value='ritik'
    passwordInput.value='1234'
    usernamaeInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let button = hostElement.querySelector('#login')!;
      button.click();
        expect(dataServiceStub.getLogin()).toBe("true"); 
  });

  it('on entering wrong username user shouldnot be loggedin', () => {
    const hostElement = fixture.nativeElement;
    const usernamaeInput = hostElement.querySelector('#username')!;
    const passwordInput = hostElement.querySelector('#password')!;
    
    usernamaeInput.value='ritiki'
    passwordInput.value='1234'
    usernamaeInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let button = hostElement.querySelector('#login')!;
      button.click(); 
        expect(dataServiceStub.getLogin()).toBe("false"); 
  });

  it('on entering wrong password user shouldnot be loggedin', () => {
    const hostElement = fixture.nativeElement;
    const usernamaeInput = hostElement.querySelector('#username')!;
    const passwordInput = hostElement.querySelector('#password')!;
    
    usernamaeInput.value='ritik'
    passwordInput.value='1234555'
    usernamaeInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let button = hostElement.querySelector('#login')!;
      button.click();  
        expect(dataServiceStub.getLogin()).toBe("false"); 
  });

  it('on entering correct credential user should be loggedin', () => {
    const hostElement = fixture.nativeElement;
    const usernamaeInput = hostElement.querySelector('#username')!;
    const passwordInput = hostElement.querySelector('#password')!;
    
    usernamaeInput.value='ritik'
    passwordInput.value='1234'
    usernamaeInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let button = hostElement.querySelector('#login')!;
      button.click();
        expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
  
});

