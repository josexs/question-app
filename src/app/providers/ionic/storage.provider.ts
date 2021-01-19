import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({ providedIn: 'root' })
export class StorageProvider {
  constructor(private storage: Storage) {}

  get<T>(key: string): Promise<T> {
    return this.storage.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }

  async clear(): Promise<void> {
    await this.storage.clear();
  }
}
