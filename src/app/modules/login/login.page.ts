import { AuthProvider } from './../../providers/api/auth.provider';
import { Component } from '@angular/core';
import { AlertProvider } from '@providers/ionic/alert.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
})
export class LoginPage {
  email = '';
  password = '';
  constructor(
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private router: Router
  ) {}

  ionViewWillEnter() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['admin']);
    }
  }

  login() {
    this.authProvider.login({ email: this.email, password: this.password }).then(
      (response: { item: any; token: string }) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['admin']);
      },
      (error) => {
        if (error.error && error.error.message) {
          this.alertProvider.presentAlert('Vaya!', error.error.message);
        } else {
          this.alertProvider.presentAlert('Vaya!', 'Ha ocurrido un error, intentalo mas tarde');
        }
      }
    );
  }
}
