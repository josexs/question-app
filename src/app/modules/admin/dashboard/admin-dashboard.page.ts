import { StorageProvider } from 'app/shared/providers/ionic/storage.provider';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage {
  items = [];
  constructor(private router: Router, private storageProvider: StorageProvider) {}

  async ionViewWillEnter(): Promise<void> {
    this.createItems();
  }

  createItems() {
    this.items = [
      {
        title: 'Todas las preguntas',
        subtitle: 'Solo las publicadas',
        action: 'start',
        color: 'light',
        state: true,
        event: 'adminAllQuestions',
        route: '/admin/all',
      },
      {
        title: 'Preguntas enviadas',
        subtitle: 'Solo las enviadas',
        action: 'continue',
        color: 'light',
        state: true,
        event: 'adminSentQuestions',
        route: '/admin/sent',
      },
      {
        title: 'Crear pregunta',
        subtitle: 'Añade directamente preguntas',
        action: 'continue',
        color: 'light',
        state: true,
        event: 'adminCreateQuestion',
        route: '/admin/create',
      },
      {
        title: 'Cerrar sesion',
        subtitle: 'Salir del menu admin',
        action: 'continue',
        color: 'light',
        state: true,
        event: 'adminLogout',
        route: '/dashboard',
      },
    ];
  }

  goTo(route: string) {
    if (route === '/dashboard') {
      this.storageProvider.remove('token');
    }
    this.router.navigate([`${route}`]);
  }

  logout() {
    this.storageProvider.remove('token');
    this.router.navigate(['init-options']);
  }
}
