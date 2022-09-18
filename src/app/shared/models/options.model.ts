import { OptionsGameI } from '@interfaces/options-game.interface';
import { ParticipantI } from '@interfaces/participant.interface';

export class OptionsGameM implements OptionsGameI {
  totalParticipants: string;
  durationQuestion: string;
  type: string;
  participants: ParticipantI[];
  state: string;
  rounds: string;

  constructor(data?: OptionsGameI) {
    this.totalParticipants = data?.totalParticipants ?? '2';
    this.durationQuestion = data?.durationQuestion ?? '15';
    this.type = data?.type ?? 'normal';
    this.participants = data?.participants ?? [];
    this.state = data?.state ?? 'todo';
    this.rounds = data?.rounds ?? '10';
  }
}
