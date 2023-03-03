import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { PasswordManagerService } from '../../services/password-manager.service';
import { editSiteDTO, ISite } from '../../models/site.model';

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
  isSuccess = false;
  successMessage: string | undefined;

  constructor(private passwordManagerService: PasswordManagerService) {
    this.formState = FormState.Add;
  }

  ngOnInit() {
    this.loadSites();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    try {
      if (this.formState == FormState.Add) {
        await this.passwordManagerService.addSite(this.myForm.value);
        this.myForm.reset();
        this.showAlert('Data Saved Sucessfully');
        console.log('Data Saved Successfully');
      } else {
        await this.passwordManagerService.updateSite(this.initForm);
        this.myForm.reset();
        this.showAlert('Data Edit Sucessfully');
        this.formState = FormState.Add;
        console.log('Data Updated Successfully');
      }
    } catch (error) {
      console.error(error);
      this.isSuccess = false;
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

  async deleteSite(id: string) {
    try {
      await this.passwordManagerService.deleteSite(id);
      this.showAlert('Data Deleted Sucessfully');
      console.log('Site deleted');
    } catch (error) {
      console.error(error);
    }
  }
}
