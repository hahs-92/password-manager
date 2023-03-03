import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { PasswordManagerService } from '../../services/password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;
  allSites$!: Observable<any>;

  constructor(private passwordManagerService: PasswordManagerService) {}

  ngOnInit() {
    this.loadSites();
  }

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    try {
      await this.passwordManagerService.addSite(this.myForm.value);
      this.myForm.reset();
      console.log('Data Save Successfully');
    } catch (error) {
      console.error(error);
    }
  }

  loadSites() {
    this.allSites$ = this.passwordManagerService.loadSites();
  }
}
