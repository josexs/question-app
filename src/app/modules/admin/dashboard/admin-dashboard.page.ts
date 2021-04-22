import { StorageProvider } from '@providers/ionic/storage.provider';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.page.html',
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
      color: 'dark',
      state: true,
      event: 'adminAllQuestions',
      route: '/admin/all',
    },
    {
      title: 'Preguntas enviadas',
      subtitle: 'Solo las enviadas',
      action: 'continue',
      color: 'dark',
      state: true,
      event: 'adminSentQuestions',
      route: '/admin/sent',
    },
    {
      title: 'Crear pregunta',
      subtitle: 'Añade directamente preguntas',
      action: 'continue',
      color: 'dark',
      state: true,
      event: 'adminCreateQuestion',
      route: '/admin/create',
    },
    {
      title: 'Cerrar sesion',
      subtitle: 'Salir del menu admin',
      action: 'continue',
      color: 'dark',
      state: true,
      event: 'adminLogout',
      route: '/',
    },
  ];
}

  goTo(route: string) {
    this.router.navigate([`${route}`]);
  }

  logout() {
    this.storageProvider.remove('token');
    this.router.navigate(['init-options']);
  }
}
