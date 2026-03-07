import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private firestore: Firestore) {}

  getPersonas(): Observable<any[]> {
    const ref = collection(this.firestore, 'test');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  addPersona(persona: any) {
    const ref = collection(this.firestore, 'test');
    return addDoc(ref, persona);
  }

  deletePersona(id: string) {
    const ref = doc(this.firestore, `test/${id}`);
    return deleteDoc(ref);
  }

}