import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('myForm') myForm!: NgForm;

  initialForm = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

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
    } catch (error) {
      console.error(error);
    }
  }
}
