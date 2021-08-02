import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public afs: AngularFirestore) { }

  getProductos(): Observable<any[]> {
    return this.afs.collection("product").valueChanges();
  }
}
