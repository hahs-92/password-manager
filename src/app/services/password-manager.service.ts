import { Injectable } from '@angular/core';
import { ISite } from '../models/site.model';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private firestore: Firestore) {}

  addSite(data: ISite) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }

  loadSites() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite({ id, ...data }: ISite) {
    const dbInstance = doc(this.firestore, 'sites', id);
    return updateDoc(dbInstance, data);
  }
}
