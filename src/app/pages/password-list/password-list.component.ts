import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISite } from '../../models/site.model';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  site!: ISite;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.site = { ...params } as ISite;
    });
  }
}
