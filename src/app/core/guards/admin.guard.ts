import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StorageProvider } from '@providers';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private storageProvider: StorageProvider) {}
  async canActivate(): Promise<boolean> {
    const token = await this.storageProvider.get('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
