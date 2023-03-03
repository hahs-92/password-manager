import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISite } from '../../models/site.model';
import { NgForm } from '@angular/forms';
import { PasswordManagerService } from '../../services/password-manager.service';
import { Observable } from 'rxjs';
import { IPassword } from '../../models/password.model';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  @ViewChild('myForm') myForm!: NgForm;
  site!: ISite;
  passwordList$!: Observable<IPassword[]>;

  constructor(
    private route: ActivatedRoute,
    private passwordManagerService: PasswordManagerService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.site = { ...params } as ISite;
    });

    this.loadpassword();
  }

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    try {
      await this.passwordManagerService.addPassword(
        this.myForm.value,
        this.site.id
      );
      console.log('Password Saved');
    } catch (error) {
      console.error(error);
    }
  }

  loadpassword() {
    if (this.site.id) {
      this.passwordList$ = this.passwordManagerService.loadPasswords(
        this.site.id
      ) as unknown as Observable<IPassword[]>;
    }
  }
}
