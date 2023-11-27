import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule,By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule

      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("testing title",()=>{
    expect(component.componentName).toBe("login");
  })

  it("testing nav element",()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".navbar").textContent).toBeTruthy();
  })

  it("testing head element",()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".some").textContent).toContain("Login User");
   })

   it("testing form element",()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".form-group").textContent).toBeTruthy();
   })

   it("[CHECK BUTTON] testing button",()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".btn").textContent).toBeTruthy();
   })
   it('[INITIALLY INPUT IS EMPTY] -should contain blank value input elements',()=>
  {
    let element= fixture.debugElement.query(By.css('input'));

    expect(element).toBeTruthy();
    expect(element.nativeElement.value).toBe('');
  });
  it('[CHECK EMAIL] should check email address is valid',()=>{
    let email=component.login.controls['email'];
    email.setValue('saikirunrayudu@gmail.com');
    expect(email.errors).toBeNull();
  });
  it('[CHECK PASSWORD] should check password valid',()=>{
    let password=component.login.controls['password'];
    password.setValue('Newsapp@123');
    expect(password.errors).toBeNull();
    expect(password.valid).toBeTruthy();
  });
  it('[FORM CHECK]should check form is valid',()=>{
    component.login.controls['email'].setValue('saikirunrayudu@gmail.com');
    component.login.controls['password'].setValue('Newsapp@123');
    expect(component.login.valid).toBeTruthy();
  });
  


});
