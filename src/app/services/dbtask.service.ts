import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {

  /**
   * Se declara una variable SQLiteObject y se inicializa en null
   * donde se guardara la instancia de SQLiteObject
   */
  db: SQLiteObject = null;
  
  constructor() { }
  /**
   * Permite guardar un objeto SQLiteObject
   * en la variable db
   */
  setDatabase(db:SQLiteObject) {
    if(this.db===null)
    {
      this.db=db
    };
  }
  /**
   * Crea las tablas necesarias para el funcionamiento
   */
  createTables():Promise<any>{
    let tables=`
    CREATE TABLE IF NOT EXISTS sesion_data
    (
      user_name TEXT PRIMARY KEY NOT NULL,
      password INTEGER NOT NULL,
      active INTEGER(1) NOT NULL
    );`;
    return this.db.executeSql(tables);
  }
  /**
   * Retorna si existe un usuario activo o no.
   */
  sesionActive(){
    // Se desarrolla la consulta
    let sql = `SELECT user_name,active FROM sesion_data WHERE active=1 LIMIT 1`;
    // Se ejecuta la consulta y no le pasamos parametros [value,value1,...]
    return this.db.executeSql(sql,[])
    // Cuando se ejecute la consulta
    .then(response=>{ // obtenemos lo que devuelve la consulta
      return Promise.resolve(response.rows.item(0)); // Se obtiene el primer item de la consulta y se retorna
    });
  }
  /**
   * Función que valida la existencia del usuario que esta iniciando sesión
   * @param sesion Datos de inicio de sesión Usuario y Password
   */
  getSesionData(sesion:any){
    let sql = `SELECT user_name, active FROM sesion_data
    WHERE user_name=? AND password=? LIMIT 1`;
    return this.db.executeSql(sql,[sesion.usuario,
      sesion.password]).then(response=>{
        return Promise.resolve(response.rows.item(0));
      });
  }

  /**
   * Funcion para consultar si el usuario existe
   * @param usuario Dato el nombre del usuario
   * @returns 
   */
  usuarioExiste(usuario:any){
    let sql=`SELECT user_name, active FROM sesion_data
    WHERE user_name=?`;
    return this.db.executeSql(sql, [usuario]).then(response=>{
      return Promise.resolve(response.rows.item(0));
    });
  }


  /**
   * Función que crea un nuevo registro de inicio de sesión
   * @param sesion Datos de inicio de sesión Usuario, Password y Active
   */
  createSesionData(sesion:any){
    let sql = `INSERT INTO sesion_data(user_name,password,active)
    VALUES(?,?,?)`;
    return this.db.executeSql(sql, [sesion.usuario, 
      sesion.password, sesion.Active]).then(response=>{
        return this.getSesionData(sesion);
        //return Promise.resolve(response.rows.item(0));
      });
  }
  updateSesionData(sesion:any){
    let sql = `UPDATE sesion_data
    SET active=?
    WHERE user_name=?`;
    return this.db.executeSql(sql, [sesion.active,sesion.user_name]);
  }
 
/*   updateContrasena(sesion:any){
    let sql =`UPDATE sesion_data
    SET password=?
    WHERE user_name=?`;
    return this.db.executeSql(sql,[sesion.password,sesion.usuario])
  } */
}
