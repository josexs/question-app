import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageProvider {
  constructor(private storage: Storage) {
    this.startDB();
  }

  async startDB(): Promise<Storage> {
    return this.storage.create();
  }

  async get<T>(key: string): Promise<T> {
    this.startDB();
    return this.storage.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    this.startDB();
    await this.storage.set(key, value);
  }

  async remove(key: string): Promise<void> {
    this.storage.remove(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }

  setDarkMode(value: 'yes' | 'no' | 'system'): void {
    this.set('darkMode', value);
  }

  getDarkMode(): Promise<string> {
    return this.get<string>('darkMode');
  }
}
