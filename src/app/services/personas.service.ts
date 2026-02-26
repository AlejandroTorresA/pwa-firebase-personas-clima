import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private firestore: Firestore) {}

  getPersonas(): Observable<any[]> {
    const ref = collection(this.firestore, 'test');
    return collectionData(ref, { idField: 'id' });
  }

}