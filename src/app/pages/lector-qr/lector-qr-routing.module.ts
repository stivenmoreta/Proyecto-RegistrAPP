import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LectorQrPage } from './lector-qr.page';

const routes: Routes = [
  {
    path: '',
    component: LectorQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LectorQrPageRoutingModule {}
