import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ParticipantI } from '@interfaces';
import { AlertProvider } from '@providers';

@Component({
  selector: 'options-participants',
  templateUrl: 'options-participants.component.html',
})
export class OptionsParticipantsComponent {
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  @Input() participants: number;
  @Output() confirm = new EventEmitter<ParticipantI[]>();
  imgURI: string = null;
  users: ParticipantI[] = [
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

  clickedImage: string;

  constructor(private alertProvider: AlertProvider) {}

  goToConfirm() {
    const users = this.users.filter(
      (item) => item.name !== '' && item.gender !== ''
    );
    if (users.length > 1) {
      this.users = users;
      this.confirm.emit(this.users);
    } else {
      this.alertProvider.presentAlert('¡Oye!', 'Minimo 2 participantes');
    }
  }

  uploadPWA() {
    if (this.pwaphoto == null) {
      return;
    }

    const fileList: FileList = this.pwaphoto.nativeElement.files;
    if (fileList && fileList.length > 0) {
      this.firstFileToBase64(fileList[0]).then(
        (result: string) => {
          this.imgURI = result;
        },
        () => {
          this.imgURI = null;
        }
      );
    }
  }

  private firstFileToBase64(fileImage: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

  captureImage() {
    return true;
  }
}
