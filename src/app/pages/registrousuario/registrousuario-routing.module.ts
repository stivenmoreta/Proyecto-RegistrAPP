import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrousuarioPage } from './registrousuario.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrousuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrousuarioPageRoutingModule {}
