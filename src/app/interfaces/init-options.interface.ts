import { ParticipantI } from './participant.interface';

export interface OptionsI {
  numberParticipants: string;
  durationGame: string;
  durationQuestion: string;
  type: string;
  participants: ParticipantI[];
  state: string;
}