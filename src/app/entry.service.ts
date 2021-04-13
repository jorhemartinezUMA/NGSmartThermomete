import { Injectable } from '@angular/core';
import { Entry } from './entry';
//import { ENTRIES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private firestore: AngularFirestore) { }

  public getEntries() {
    return this.firestore.collection('device-configs').snapshotChanges();
  }
}
