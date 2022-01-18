import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarsesionPage } from './iniciarsesion.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarsesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarsesionPageRoutingModule {}
