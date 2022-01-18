import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

import { DBTaskService } from 'src/app/services/dbtask.service';
import { Router, NavigationExtras} from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../services/authentication.service';

import {Usuario} from '../../model/usuario';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements OnInit {

  // Modelo user que permite obtener y setear información para el login

  login: Usuario={
    usuario:"",
    password:""
  }


  // variable para mostrar el campo faltante
  field:string="";
  // Constructor que llama al toastController para su uso
  constructor(
    public toastController: ToastController,
    public dbtaskService: DBTaskService,
    public alertController: AlertController,
    public authenticationSerive:AuthenticationService,
    private router: Router, 
    private storage: Storage,
    ) {
   }
  


  public ngOnInit(): void {
    //this.usuario.nombreUsuario='Completo';
    //this.usuario.password='todos';
    // this.ingresar();
  }


  /**
   * Función que permite el inicio de sesión y acceder
   * al Home
   */
  ingresar(){
    // Se valida que el usuario ingreso todos los datos
    if(this.validateModel(this.login)){
      // Se obtiene si existe alguna data de sesión
      this.authenticationSerive.login(this.login);
    }
    else{
      this.presentToast("Falta: "+this.field);
    }
  }


  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
   validateModel(model:any){
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value=="") {
        // Se asigna el campo faltante
        this.field=key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }

  public recuperarContrasena(){
    this.router.navigate(['/recuperarcontrasena']);
  }
  public registrarUsuario(){
    this.router.navigate(['/registrousuario']);
  }
  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async presentToast(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  ionViewWillEnter(){
    console.log('ionViewDidEnter');
      // Se valida que exista una sesión activa
      this.dbtaskService.sesionActive()
      .then((data)=>{
        if(data!=undefined){
          this.storage.set("USER_DATA",data); 
          //this.router.navigate(['home']);
          //enviar los datos para que home tenga el nombre y no arme el bucle
          const navigationExtras: NavigationExtras = {
            state: {
              usuario: data.user_name
            }
          };
          this.router.navigate(['/home'], navigationExtras);
        }
      })
      .catch((error)=>{
        console.error(error);
        this.router.navigate(['iniciarsesion']);
      })
  }

/*   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Creación de Usuario',
      message: 'Mensaje <strong>El usuario no existe, desea registrarse?</strong>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'SI',
          handler: () => {
            this.createSesionData(this.login)
          }
        }
      ]
    });

    await alert.present();
  } */

}
