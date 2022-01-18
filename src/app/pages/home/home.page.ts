import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../../model/usuario';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  //public usuario: Usuario;
  public usuario: String;

  constructor(
    private activeroute: ActivatedRoute, 
    private router: Router,
    private alertController: AlertController,
    private auth: AuthenticationService
    ) {


      this.activeroute.queryParams.subscribe(params => {       // Utilizamos expresión lambda
        if (this.router.getCurrentNavigation().extras.state) { // Validar que tenga datos extras
  
          this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  
        } else {

          this.router.navigate(['/iniciarsesion']);
        }
      });
  }

  public lectorqr(){
    this.router.navigate(['/lector-qr']);
  }

  cerrar(){
    this.auth.logout()
  }
  
  foro(){
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/foro'], navigationExtras);
  }

}
