import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
                if (!(localStorage.getItem('email') || localStorage.getItem('email') === 'null')) {
                  this.router.navigate(['home']);
                }
               }

  ngOnInit() {
    this.buildForm();
  }

  /**
   * @method buildForm()
   * @desc  by using these  menthod validate the login form input.
   * @return void
   */
  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [Validators.required,
        Validators.pattern('^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,15}$')]
      ],
      password: ['',
        [Validators.required]
      ]
    });
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  submitLogin(): void {
    if (this.checkUserCredentials()) {
      localStorage.setItem('email', this.loginForm.value.email);
      this.router.navigate(['home']);
    } else {
      alert('Invalid Credentials!!!!!!!!!');
    }
  }

  checkUserCredentials(): boolean {
    console.log(Users, this.loginForm.value);

    return Users.find(user => user.email === this.loginForm.value.email && user.password === this.loginForm.value.password) ? true : false;
  }
}
export const Users = [{
  email: 'test1@myimdb.com',
  password: 'Admin@123'
},
{
  email: 'test2@myimdb.com',
  password: 'Admin@123'
}];
