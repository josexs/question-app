import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: 'send.page.html',
})
export class SendPage {
  constructor(private router: Router) {}

  goToDashboad(): void {
    this.router.navigate(['/dashboard']);
  }
}
