import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

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

    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.get('login').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      return;
    }

    const objParams = this.loginForm.value;
    this.loginService.login(objParams).subscribe(resp => {

      if (resp.statusCode === 200 && resp.status === 'Success') {
        this.commonService.setToken(resp.data.userData);
        this.router.navigateByUrl('/playGame');
      } else {
        alert('Invalid login details');
      }
    },
      r => {
        alert('Invalid login details');
      });
  }

}
