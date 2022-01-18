import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarcontrasenaPageRoutingModule } from './recuperarcontrasena-routing.module';

import { RecuperarcontrasenaPage } from './recuperarcontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarcontrasenaPageRoutingModule
  ],
  declarations: [RecuperarcontrasenaPage]
})
export class RecuperarcontrasenaPageModule {}
