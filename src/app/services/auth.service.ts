import { Persona } from './../modelo/persona';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
  ) { }

  async onRegister(email: string, password: string): Promise<any>{
    console.log("Registro Email&Password -> Nombre: " + "Email: ", email)
    try {
      console.log("Auth service - email", email, "Contrasena: ", password);
      this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = await this.afAuth.currentUser;
      return await user.updateProfile({
        //displayName: name,
        photoURL: "../assets/imagenes/User.png"
      });
    } catch (error) {
      console.log('Error on register user: ', error);
    }
  }


  // login With Email

  async onLogin (email: string, password: string): Promise<void>{
    console.log("Auth service Login - email",email, "Contrasena: ", password);
    try {
      const firebaseUser = await this.afAuth.signInWithEmailAndPassword(email, password)
      return await this.updateUserData(firebaseUser.user, "email");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error on login: ', error);
    }
  }


  userExists(email: string) {
    console.log("User: " + email + "exists");
    return this.afs
      .collection("users", ref => ref.where("email", "==", email))
      .valueChanges()
      .pipe(first())
      .toPromise();
   }
  

  // Guardar datos del usuario en Firestore

 async updateUserData(usertemp: any, provider: any) {
  
  //const userRef = this.afs.collection<any>('users');
  const userRef: AngularFirestoreDocument<Persona> = this.afs.doc(`users/${usertemp.uid}`);
  console.log("Update" + JSON.stringify(usertemp));
  const doc: any = await this.userExists(usertemp.email);
  console.log("doc" + JSON.stringify(doc));
  let data: any;
  let user: any = JSON.parse(JSON.stringify(usertemp));

  console.log("doc" + JSON.stringify(doc));
  if (doc == null || doc == "") {
    //Crear cuenta
    data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || '',
      photoURL: user.photoURL || "../assets/imagenes/User.png",
      provider: provider,
      lastLogin: new Date(Number(user.lastLoginAt)) || new Date(),
      createdAt: new Date(Number(user.createdAt)) || new Date()
    };
  } else if (doc.active == false) {
    throw { error_code: 999, error_message: "Acceso denegado, servicio deshabilitado, consulte con el administrador." };
  } else {
    //Actualizar cuenta
    data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || '',
      photoURL: user.photoURL || "../assets/imagenes/User.png",
      provider: provider,
      lastLogin: new Date(Number(user.lastLoginAt)) || new Date()
    };
  }
  console.log("data", JSON.stringify(data))

  //return userRef.doc(`${user.uid}`).set(data, { merge: true });

  return userRef.set(data, { merge: true });
}

 // Logout 
 async logout(): Promise<any> {
  return this.afAuth.signOut();
} 
}
