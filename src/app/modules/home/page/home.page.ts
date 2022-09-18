import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Gtag } from 'angular-gtag';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, private gtag: Gtag) {}

  goToDashboad(): void {
    this.gtag.event('start');
    this.router.navigate(['/dashboard']);
  }
}
