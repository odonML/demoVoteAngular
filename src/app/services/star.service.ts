import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';
import { Star } from '../models/star';
import { Producto } from '../models/producto';
import { AuthService } from './auth.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class StarService {
  userDetail: User;

  estrellas: AngularFirestoreCollection<Star>;

  estrella: AngularFirestoreDocument<Star>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
    ) { }
    
    // Create or update star
    addStar(star:Star){

      const starPath = `star/${star.userKey}_${star.productKey}`;
      console.log("AQUI "+JSON.parse(JSON.stringify(star)))
      return this.db.doc(starPath).set(star);
  
    }
   

  getStars(productKey){
    this.userDetail = this.authService.getLoggedInUser();
    
    this.estrellas = this.db.collection('star/', 
    ref => ref.where('userKey','==', this.userDetail.$key)
    .where('productKey','==',productKey));

    console.log("HOLA=-------"+this.estrellas);
    return this.estrellas;
    
  }

  getAllStar(){
    console.log("se hace la peticion");
   
   this.estrellas = this.db.collection('star');
   return this.estrellas;
   
  }

}
