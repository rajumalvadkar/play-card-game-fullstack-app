import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;
  skills: any;

  arrAllowdedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  constructor(
    private loginService: LoginService,
    private commonService: CommonService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.commonService.isLogged()) {
      this.router.navigate(['/playGame']);
    }

    this.signupForm = this.fb.group({
      login: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      skills: ['']
    });

  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.get('name').markAsTouched();
      this.signupForm.get('login').markAsTouched();
      this.signupForm.get('password').markAsTouched();
      return;
    }


    const objParams = this.signupForm.value;
    objParams['skills'] = this.skills;

    this.loginService.signup(objParams).subscribe(resp => {
      if (resp.statusCode === 200 && resp.status === 'Success') {
        alert('You are registered successfully');
        this.goToLogin();
      } else {
        alert(resp.errorMessage);
      }
    }, error => {
      alert('Failed to register');
    });
  }
}
