import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

// Se definen las rutas a nivel de APP
const routes: Routes = [
  {
    path: '',
    redirectTo: 'iniciarsesion',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'iniciarsesion',
    loadChildren: () => import('./pages/iniciarsesion/iniciarsesion.module').then( m => m.IniciarsesionPageModule)
  },
  {
    path: 'lector-qr',
    loadChildren: () => import('./pages/lector-qr/lector-qr.module').then( m => m.LectorQrPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./pages/recuperarcontrasena/recuperarcontrasena.module').then( m => m.RecuperarcontrasenaPageModule)
  },
  {
    path: 'registrousuario',
    loadChildren: () => import('./pages/registrousuario/registrousuario.module').then( m => m.RegistrousuarioPageModule)
  },
  {
    // En caso de cualquier error en la ruta se redirecciona al Not Found
    path: 'error',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'foro',
    loadChildren: () => import('./pages/foro/foro.module').then( m => m.ForoPageModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
