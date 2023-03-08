import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ISite } from '../../models/site.model';
import { CryptService } from '../../services/crypt.service';
import { PasswordManagerService } from '../../services/password-manager.service';
import { IPassword } from '../../models/password.model';
import { DialogComponent } from '../../components/dialog/dialog.component';

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
  decrypt = false;

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
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

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    const encryptedPassword = this.cryptService.encryptPassword(
      this.password.password
    );

    try {
      if (this.formState == FormState.Add) {
        await this.passwordManagerService.addPassword(
          { ...this.myForm.value, password: encryptedPassword },
          this.site.id
        );
        this.openSnackBar('Data Saved Successfully', 'Ok');
      } else {
        await this.passwordManagerService.updatePassword(
          this.site.id,
          this.password
        );
        this.formState = FormState.Add;
        this.openSnackBar('Data Updated Successfully', 'Ok');
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      try {
        await this.passwordManagerService.deletePassword(this.site.id, id);
        this.openSnackBar('Data Deleted Successfully', 'Ok');
      } catch (error) {
        console.error(error);
      }
    });
  }

  onDecrypt(password: string, index: number) {
    if (!this.decrypt) {
      const decPassword = this.cryptService.decryptPassword(password);
      this.passwordList[index].password = decPassword;
      this.decrypt = true;
      return;
    }

    const unPassword = this.cryptService.encryptPassword(password);
    this.passwordList[index].password = unPassword;
    this.decrypt = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnDestroy() {
    this.passwordSubscription.unsubscribe();
  }
}
