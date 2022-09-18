import { ParticipantI } from '../../interfaces/participant.interface';
import { StorageProvider } from '../ionic/storage.provider';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameProvider {
  currentShifts: ParticipantI;
  constructor(private storageProvider: StorageProvider) {}
}
