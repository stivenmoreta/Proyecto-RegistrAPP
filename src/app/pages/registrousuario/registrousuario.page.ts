import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { DBTaskService } from 'src/app/services/dbtask.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras} from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {Usuario} from '../../model/usuario';
@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.page.html',
  styleUrls: ['./registrousuario.page.scss'],
})
export class RegistrousuarioPage implements OnInit {
  // Modelo user que permite obtener y setear información para el login
  login: Usuario={
    usuario:"",
    password:""
  }
  repassword: String;

  // variable para mostrar el campo faltante
  field:string="";
  constructor(
    public authenticationSerive:AuthenticationService,
    public toastController: ToastController,
    public dbtaskService: DBTaskService,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registrar(){
    if(this.repassword === this.login.password){
      console.log("pase por aqui");
      this.createSesionData(this.login);
    }else{
      this.presentToast("La contraseña no coincide");
    }
  }
  /**
   * Función que genera (registra) una nueva sesión
   * @param login 
   */
   createSesionData(login: any) {
    if(this.validateModel(login)){ // Se valida que se ingresen todos los datos
      console.log("pase por aqui 2");
      /**
       * Se hace una copia del login, se hace así ya que
       * el operador '=' no haceuna copia de los datos, si no
       * que crea una nueva referencia a los mismos datos.
       * Por eso se utiliza el Object.assign
       */
      let copy = Object.assign({},login);
      copy.Active=1; // Se agrega el valor active = 1 a la copia
      console.log(copy);
      this.dbtaskService.createSesionData(copy) // la copia se le apsa a la función para crear la sesion
      .then((data)=>{ // si la sentencia se ejecuto correctamente
        console.log(data);
        this.presentToast("Bienvenido"); // Se muestra el mensaje de bienvenido
        this.storage.set("USER_DATA",data);  // Se setea el USER_DATA en el storage
        //this.router.navigate(['/home']); // Se navega hasta el home
        console.log("llego registro:"+data.user_name);
        this.authenticationSerive.authState.next(true);
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: data.user_name
          }
        };
        console.log(data.user_name);
        this.router.navigate(['iniciarsesion'], navigationExtras);
      })
      .catch((error)=>{
        console.log("No se registro"+error);
        this.presentToast("El usuario ya existe");
      })
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

  async presentToast(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}
