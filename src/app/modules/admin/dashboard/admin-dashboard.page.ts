import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.page.html',
})
export class AdminDashboardPage {
  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([`admin/${route}`]);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['init-options']);
  }
}
