import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ISite } from '../../models/site.model';
import { CryptService } from '../../services/crypt.service';
import { PasswordManagerService } from '../../services/password-manager.service';
import { IPassword } from '../../models/password.model';

enum FormState {
  Add = 'Add',
  Edit = 'Edit',
}

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  @ViewChild('myForm') myForm!: NgForm;
  passwordSubscription = new Subscription();
  site!: ISite;
  passwordList!: IPassword[];
  password: IPassword;
  formState: FormState;
  isSuccess = false;
  successMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private cryptService: CryptService,
    private passwordManagerService: PasswordManagerService
  ) {
    this.password = { id: '', email: '', username: '', password: '' };
    this.formState = FormState.Add;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.site = { ...params } as ISite;
    });

    this.loadpassword();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    const encryptedPassword = this.encryptPassword(this.password.password);

    try {
      if (this.formState == FormState.Add) {
        await this.passwordManagerService.addPassword(
          { ...this.myForm.value, password: encryptedPassword },
          this.site.id
        );
        console.log('Password Saved');
        this.showAlert('Password Saved');
      } else {
        await this.passwordManagerService.updatePassword(
          this.site.id,
          this.password
        );
        this.formState = FormState.Add;
        console.log('Password updated');
        this.showAlert('Password updated');
      }
      this.myForm.reset();
    } catch (error) {
      console.error(error);
    }
  }

  loadpassword() {
    if (this.site.id) {
      this.passwordSubscription = this.passwordManagerService
        .loadPasswords(this.site.id)
        .subscribe((list) => {
          this.passwordList = list as IPassword[];
        });
    }
  }

  editPassword(password: IPassword) {
    this.password = password;
    this.formState = FormState.Edit;
  }

  async deletePassword(id: string) {
    try {
      await this.passwordManagerService.deletePassword(this.site.id, id);
      this.showAlert('Password deleted');
      console.log('Password deleted');
    } catch (error) {
      console.error(error);
    }
  }

  encryptPassword(password: string) {
    return this.cryptService.encryptPassword(password);
  }

  decryptPassword(password: string) {
    return this.cryptService.decryptPassword(password);
  }

  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    this.passwordList[index].password = decPassword;
  }

  ngOnDestroy() {
    this.passwordSubscription.unsubscribe();
  }
}
