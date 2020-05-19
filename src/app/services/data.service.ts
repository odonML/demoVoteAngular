import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Producto } from '../models/producto';
import { User } from '../models/user';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  userDetail: User;
  productos: AngularFirestoreCollection<Producto>;
  producto: AngularFirestoreDocument<Producto>;
  constructor(
    private authService: AuthService,
    private db: AngularFirestore
  ) { }


 getProducto(){
   console.log("se hace la peticion");
  
  this.productos = this.db.collection('productos');
  return this.productos;
  
 }
 getProductoById(id){
  this.producto = this.db.collection('productos/').doc(id);
  console.log("---------- "+this.producto);
  return this.producto;
 }

 addProducto(product:Producto){
  this.userDetail = this.authService.getLoggedInUser();
  product['userKey']=this.userDetail.$key;

  console.log(product);
  return this.db.collection('productos/').add(product);
 }
 updateProduct(key:string, form:Producto){
  console.log("ID service"+key);
   var titulo = form.titulo;
   var descripcion = form.descripcion;
   var categoria = form.categoria;
   var foto = form.foto;
   var cantidad = form.cantidad;
   var precio = form.precio;


   this.db.doc('productos/'+key).ref.get().then(function(product){
     if(product.exists){
       console.log("usuario existe en BD");
       product.ref.update({
         titulo:titulo,
         descripcion: descripcion,
         categoria: categoria,
         foto: foto,
         cantidad: cantidad,
         precio: precio
       });
     }else{
       console.log("NA");
     }
   }).catch(function( error ){
    console.log( "Error Getting Document:", error )
  });
 }

 deleteProduct(key){
   this.db.collection('productos/').doc(key).delete().then(function(){
     console.log("eliminado");
   }).catch(function(error) {
    console.error("Error removing document: ", error);
    });
 }
}
