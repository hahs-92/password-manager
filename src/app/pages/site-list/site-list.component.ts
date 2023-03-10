import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { PasswordManagerService } from '../../services/password-manager.service';
import { editSiteDTO, ISite } from '../../models/site.model';
import { DialogComponent } from '../../components/dialog/dialog.component';

enum FormState {
  Add = 'Add',
  Edit = 'Edit',
}
@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;
  allSites$!: Observable<ISite[]>;

  initForm: ISite = {
    id: '',
    siteName: '',
    siteURL: '',
    siteImgURL: '',
  };

  formState: FormState;

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private passwordManagerService: PasswordManagerService
  ) {
    this.formState = FormState.Add;
  }

  ngOnInit() {
    this.loadSites();
  }

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    try {
      if (this.formState == FormState.Add) {
        await this.passwordManagerService.addSite(this.myForm.value);
        this.myForm.reset();
        this.openSnackBar('Data Saved Successfully', 'Ok');
      } else {
        await this.passwordManagerService.updateSite(this.initForm);
        this.myForm.reset();
        this.openSnackBar('Data Updated Successfully', 'Ok');
        this.formState = FormState.Add;
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadSites() {
    this.allSites$ =
      this.passwordManagerService.loadSites() as unknown as Observable<ISite[]>;
  }

  editSite(site: editSiteDTO) {
    this.formState = FormState.Edit;
    this.initForm = { ...this.initForm, ...site };
  }

  deleteSite(id: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        return;
      }

      try {
        await this.passwordManagerService.deleteSite(id);
        this.openSnackBar('Data Deleted Successfully', 'Ok');
      } catch (error) {
        console.error(error);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
