import { ParticipantI } from '@interfaces';

export interface OptionsGameI {
  totalParticipants: string;
  durationQuestion: string;
  type: string;
  participants: ParticipantI[];
  state: string;
  rounds: string;
}
