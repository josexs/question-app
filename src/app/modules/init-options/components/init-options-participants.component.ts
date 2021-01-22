import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ParticipantI } from '@interfaces/participant.interface';

@Component({
    selector: 'init-options-participants',
    templateUrl: 'init-options-participants.component.html',
})
export class InitOptionsParticipants { 
    @Input() participants: number;
    @Output() confirm = new EventEmitter<ParticipantI[]>();
    @Output() simulate = new EventEmitter<void>();

    users = [
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
        { name: '', gender: '', photo: '', positive: 0, negative: 0 },
    ];
    constructor() {
        
    }

    goToConfirm() {
        this.users = this.users.filter((item) => item.name !== '' && item.gender !== '');
        this.confirm.emit(this.users)
    }
}