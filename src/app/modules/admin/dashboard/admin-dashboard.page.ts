import { StorageProvider } from '@providers/ionic/storage.provider';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.page.html',
})
export class AdminDashboardPage {
  constructor(private router: Router, private storageProvider: StorageProvider) {}

  goTo(route: string) {
    this.router.navigate([`admin/${route}`]);
  }

  logout() {
    this.storageProvider.remove('token');
    this.router.navigate(['init-options']);
  }
}
