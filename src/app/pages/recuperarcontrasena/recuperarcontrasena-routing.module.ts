import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarcontrasenaPage } from './recuperarcontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarcontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarcontrasenaPageRoutingModule {}
