import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../../services/password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit {
  allSites$!: Observable<any>;

  constructor(private passwordManagerService: PasswordManagerService) {}

  ngOnInit() {
    this.loadSites();
  }

  async onSubmit(values: object) {
    try {
      await this.passwordManagerService.addSite(values);
      console.log('Data Save Successfully');
    } catch (error) {
      console.error(error);
    }
  }

  loadSites() {
    this.allSites$ = this.passwordManagerService.loadSites();
  }
}
