import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ParticipantI } from 'app/shared/interfaces/participant.interface';
import { AlertProvider } from 'app/shared/providers/ionic/alert.provider';

@Component({
  selector: 'options-participants',
  templateUrl: 'options-participants.component.html',
})
export class OptionsParticipantsComponent {
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  @Input() participants: number;
  @Output() confirm = new EventEmitter<ParticipantI[]>();
  imgURI: string = null;
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

  uploadPWA(index: number) {
    if (this.pwaphoto == null) {
      return;
    }

    const fileList: FileList = this.pwaphoto.nativeElement.files;
    if (fileList && fileList.length > 0) {
      this.firstFileToBase64(fileList[0]).then(
        (result: string) => {
          this.imgURI = result;
        },
        (err: any) => {
          // Ignore error, do nothing
          this.imgURI = null;
        }
      );
    }
  }

  private firstFileToBase64(fileImage: File): Promise<{}> {
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
    // this.camera.getPicture(this.optionsCamera).then(
    //   (imageData) => {
    //     // imageData is either a base64 encoded string or a file URI
    //     // If it's base64 (DATA_URL):
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     this.clickedImage = base64Image;
    //   },
    //   (err) => {
    //     console.log(err);
    //     // Handle error
    //   }
    // );
  }
}
