import { ParticipantI } from './participant.interface';

export interface OptionsGameI {
  totalParticipants: string;
  durationQuestion: string;
  type: string;
  participants: ParticipantI[];
  state: string;
  rounds: string;
}
