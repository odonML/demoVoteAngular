import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  isAdmin: boolean=false;
  loggedUser;

  userObject;
  userList:User[];
  admin: boolean;

  users: AngularFirestoreCollection<User>;
  userr: AngularFirestoreDocument<User>;

  @Output() keyEvent = new EventEmitter<string>();
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private db: AngularFirestore
  ) {
    this.user = firebaseAuth.authState;
    this.userObject = new User();
    this.admin=false;
    this.user.subscribe(user => {
     if (user) {
        this.userDetails = user;
       console.log(" email : " + this.userDetails.email);
        userService
          .isAdmin(this.userDetails.email)
          .snapshotChanges()
          .subscribe((data) => {
            this.userList = [];
            console.log(" email data : " + data);

            data.forEach((element) => {
              const y= element.payload.doc.data();
              this.userObject = y;
              this.userObject.$key = element.payload.doc.id;

              console.log("data : " + this.userObject.$key);
              this.userList.push(this.userObject as User);
              console.log(JSON.stringify(this.userList));
            });

            
            const e = this.userList.find(key => key.$key == this.userObject.$key);
            console.log("entro "+e.puesto);
         
            
            if(e.puesto=="administrador"){
              this.admin=true;
                console.log("es admin? "+this.admin);
              this.isAdmin=this.admin;

              }else{
                this.admin=false
                console.log("es admin? "+this.admin);

		          }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
          });   
      } else {
        this.userDetails = null;
      } 
    });
  }

  isLoggedIn(): boolean {
    if (this.userDetails !== null) {
      return true;
    }
  }

  logout() {
    this.loggedUser = null;
    this.admin=false;
    this.firebaseAuth.auth.signOut().then(res => this.router.navigate([""]));
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      emailID,
      password
    );
  }

  



  getLoggedInUser(): User {
    const loggedUser: User = new User();
    const user = this.firebaseAuth.auth.currentUser;

    if (user) {
      this.userDetails = user;
      if (user != null) {
        loggedUser.$key=this.userObject["$key"];
        loggedUser.nombre=this.userObject["nombre"];
      }
    } else {
      this.userDetails = null;
    }

    return loggedUser;
  }
  Admin(): boolean {
    const user = this.isLoggedIn();
    // console.log("loggedUSer", user)
    // *ngIf="authService.isAdmin()"
    if (this.admin === true) {
      
        return true;
      
    }
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  getUser(){
    this.users = this.db.collection('users');
  return this.users;
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

}
