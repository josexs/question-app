import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionI } from 'app/shared/interfaces/question.interface';

@Injectable({ providedIn: 'root' })
export class AuthProvider {
  constructor(private httpClient: HttpClient) {}

  login(body: { email: string; password: string }) {
    const url = `${environment.path.api}/auth/login`;
    return this.httpClient.post(url, body).toPromise();
  }
}
