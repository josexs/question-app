import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, LoginPageRoutingModule, ReactiveFormsModule],
  declarations: [LoginPage],
})
export class LoginModule {}
