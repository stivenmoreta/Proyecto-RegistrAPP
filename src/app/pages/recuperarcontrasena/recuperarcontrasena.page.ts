import { Component,  } from '@angular/core';
import { DBTaskService } from '../../services/dbtask.service';
import { Usuario } from '../../model/usuario';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage  {

  usuario: String;


  repassword: String;

  constructor(
    private router: Router,
    public db: DBTaskService,
    public toastController: ToastController) { }


    solicitudCambioPassword(){
      this.db.usuarioExiste(this.usuario).then((data)=>{
        if(data===undefined){ // Si es undefined es por que no retorno firmas
          this.presentToast("El usuario ingresado no existe");
        }else{
          this.presentToast("Se ha enviado el correo de restablecimiento");
          this.router.navigate(['iniciarsesion']);
        }
      });
    }

  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }
}
