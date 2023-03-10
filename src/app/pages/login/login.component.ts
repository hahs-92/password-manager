import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('myForm') myForm!: NgForm;

  isError = false;
  initialForm = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    try {
      await this.authService.login(
        this.initialForm.email,
        this.initialForm.password
      );
      console.log('Login Success');
      this.isError = false;
      this.router.navigate(['/site-list']);
    } catch (error) {
      console.error('LOGIN: ', error);
      this.isError = true;
    }
  }
}
