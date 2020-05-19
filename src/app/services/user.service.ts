import { Injectable } from "@angular/core";
//import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

  selectedUser: User = new User();
  users: AngularFirestoreCollection<User>;

  location = {
    lat: null,
    lon: null
  };

  constructor(private db: AngularFirestore) {
    this.getUsers();
  }

  getUsers() {
    //this.users = this.db.list("clients");
  	this.users = this.db.collection('clients');
	
    return this.users;
  }

  createUser(data: User) {
 
    return this.db.collection('users/').add(data);

  }

  isAdmin(email: string) {
   // return this.db.collection("clients", ref =>
   //   ref.orderBy("email").isEqual(emailId)
   // Create a reference to the cities collection
   return this.db.collection("users", ref =>
      ref.where("email", "==", email));
   
  
    
// Create a query against the collection.
    //var query = clientsRef.where("state", "==", "CA");
    
  //  this.selectedUser = clientsRef;
    //return this.db.collection("clients").where.orderBy("email").isEqual(emailId)
    //return query;
  
  }

  updateUser(key : string, data : any) {
   console.log(" user " + key);

   this.db.collection("clients").doc(key)

   .update({name: data.userName,
          rfc: data.userRfc,
          col: data.userCol,
          address: data.userAddress,
          city: data.userCity,
          country: data.userCountry,
          state: data.userState,
          postalcode: data.userPostalCode,
          serie: data.userSerie,
          folio: data.userFolio,
          regimenfiscal : data.userRegimenFiscal,
          cuentabanco : data.userCuentaBanco,

          template: data.userTemplate
        });
  console.log("ok....");
  }

  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  }

}
